require('dotenv').config();
const { Client, MessageEmbed } = require('discord.js-selfbot-v13');
const axios = require('axios');
const { exec } = require('child_process');

const WEBHOOK_URL = process.env.WEBHOOK_URL;
const BUMP_CHANNEL = process.env.BUMP_CHANNEL;
const TOKEN = process.env.TOKEN;
const minBumpInterval = 7200000; // 2 hours in milliseconds
const maxBumpInterval = 10800000; // 3 hours in milliseconds
const statusUpdateInterval = 1800000; // 30 minutes in milliseconds

if (!WEBHOOK_URL || !BUMP_CHANNEL || !TOKEN) {
    console.error('Error: Missing required environment variables. Please check your .env file.');
    process.exit(1);
}

const args = process.argv.slice(2);

async function main() {
    if (args.length === 0) {
        console.log(`
 _                           
 | |__  _   _ _ __ ___  _ __  
 | '_ \\| | | | '_ \` _ \\| '_ \\ 
 | |_) | |_| | | | | | | |_) |
 |_.__/ \\__,_|_| |_| |_| .__/ 
                       |_|    
                       
Usage:
  node index.js 1  - Start the bumper
  node index.js 2  - Check environment variables
  node index.js 3  - Update everything
  
  Choose your option:
`);

        process.stdin.on('data', async (data) => {
            const option = data.toString().trim();

            switch (option) {
                case '1':
                    await startBumper();
                    break;
                case '2':
                    checkEnv();
                    break;
                case '3':
                    await updateEverything();
                    break;
                default:
                    console.log('Invalid option. Please choose 1, 2, or 3.');
                    process.exit(1);
            }
        });
    } else {
        const option = args[0];

        switch (option) {
            case '1':
                await startBumper();
                break;
            case '2':
                checkEnv();
                break;
            case '3':
                await updateEverything();
                break;
            default:
                console.log('Invalid option. Please choose 1, 2, or 3.');
                process.exit(1);
        }
    }
}

let nextBumpTime = Date.now(); // Initialize the next bump time

async function startBumper() {
    const client = new Client();

    client.on('ready', async () => {
        console.log(`[${new Date().toISOString()}] Logged in as ${client.user.tag}!`);
        const channel = await client.channels.fetch(BUMP_CHANNEL);

        async function bump() {
            try {
                console.log('Attempting to bump...');
                await channel.sendSlash('302050872383242240', 'bump'); // Send the bump command
                const bumpInterval = getRandomBumpInterval();
                nextBumpTime = Date.now() + bumpInterval;
                const minutesLeft = Math.floor(bumpInterval / 60000);
                console.log(`[${new Date().toISOString()}] Bumped! Next bump in ${minutesLeft} minutes.`);
                
                // Send success message to webhook
                await logToWebhook(
                    'Bump Status',
                    `The server has been successfully bumped! Next bump in ${minutesLeft} minutes.`,
                    '#00FF00'
                );

                // Schedule the next bump
                setTimeout(bump, bumpInterval);

                // Update the webhook every 30 minutes
                setInterval(updateWebhook, statusUpdateInterval);

            } catch (error) {
                console.error(`[${new Date().toISOString()}] Error bumping the server:`, error);
                await logToWebhook(
                    'Bump Error',
                    `Failed to bump the server. Error: ${error.message}`,
                    '#FF0000'
                );
                // Retry bumping after a short delay
                setTimeout(bump, 60000); // Retry in 1 minute
            }
        }

        bump(); // Start the bumping process
    });

    process.on('SIGINT', () => {
        console.log('Shutting down gracefully...');
        client.destroy();
        process.exit(0);
    });

    client.login(TOKEN);
}

async function checkEnv() {
    console.log(`
Configuration Loaded:
- WEBHOOK_URL: [REDACTED]
- BUMP_CHANNEL: [REDACTED]
- TOKEN: ${TOKEN.substring(0, 6)}...

Made by casualguyyea
`);
    process.exit(0);
}

async function updateEverything() {
    console.log('Updating everything...');
    try {
        await execPromise('npm update');
        await execPromise('npm install');
        console.log('Update complete.');
    } catch (error) {
        console.error('Error updating packages:', error);
    }
    process.exit(0);
}

async function logToWebhook(title, description, color, additionalInfo) {
    try {
        const embed = new MessageEmbed()
            .setColor(color)
            .setTitle(title)
            .setDescription(description)
            .addFields({ name: 'Details', value: additionalInfo || 'No additional information.' })
            .setTimestamp()
            .setFooter('Made by casualguyyea', 'https://yt3.googleusercontent.com/Ws_BpAWD46mOjCW3XCnsZ0YmghW-6fhMf6d9pvCvb4g8JJftgvL54039U1mgh31OchR4ApMTezc=s900-c-k-c0x00ffffff-no-rj');

        await axios.post(WEBHOOK_URL, {
            embeds: [embed]
        });

        console.log(`[${new Date().toISOString()}] Webhook message sent: ${title}`);
    } catch (error) {
        console.error(`[${new Date().toISOString()}] Error sending webhook message:`, error.response ? error.response.data : error.message);
    }
}

async function updateWebhook() {
    const timeLeft = Math.max(nextBumpTime - Date.now(), 0);
    const minutesLeft = Math.floor(timeLeft / 60000);

    const embed = new MessageEmbed()
        .setColor('#FFFF00')
        .setTitle('Bump Status Update')
        .setDescription('Here is the latest update on the bump status:')
        .addFields({ name: 'Time Until Next Bump', value: `${minutesLeft} minutes` })
        .setTimestamp()
        .setFooter('Made by casualguyyea', 'https://yt3.googleusercontent.com/Ws_BpAWD46mOjCW3XCnsZ0YmghW-6fhMf6d9pvCvb4g8JJftgvL54039U1mgh31OchR4ApMTezc=s900-c-k-c0x00ffffff-no-rj');

    try {
        await axios.post(WEBHOOK_URL, {
            embeds: [embed]
        });

        console.log(`[${new Date().toISOString()}] Status update sent to webhook.`);
    } catch (error) {
        console.error(`[${new Date().toISOString()}] Error sending status update to webhook:`, error.response ? error.response.data : error.message);
    }
}

function getRandomBumpInterval() {
    // Generate a random interval between 2 and 3 hours
    const randomInterval = Math.floor(Math.random() * (maxBumpInterval - minBumpInterval + 1)) + minBumpInterval;
    return randomInterval;
}

function execPromise(command) {
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                reject(`Error: ${stderr}`);
            } else {
                resolve(stdout);
            }
        });
    });
}

// Call the main function to start the script
main();
