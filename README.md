Here’s the updated README with the additional instruction for `.env` file and the command to install `dotenv`:

---

# Disboard-AutoBumpTool-selfbot

This tool automatically bumps your Discord server on Disboard. To use it, you need a Discord token, webhook link (for status updates), and channel ID for bumping.

## Warning

Selfbots violate Discord's Terms of Service. For more information, refer to [Discord Guidelines](https://discord.com/guidelines) and [Discord Terms](https://discord.com/terms).

This tool is for educational purposes only. I am not responsible for any moderation actions taken by Discord due to the use of this selfbot.

## Read This Carefully

This is an updated version of [Disboard-Auto-Bump-Selfbot](https://github.com/shroomjaks/Disboard-Auto-Bump-Selfbot). This update includes new features and improvements.

## Setup Instructions

### For Linux Users

1. Navigate to your Downloads directory:
   ```bash
   cd ~/Downloads
   ```

2. Clone the repository:
   ```bash
   git clone https://github.com/Q3ucXftMpuG1/Disboard-AutoBumpTool-selfbot.git
   ```

3. Change into the project directory:
   ```bash
   cd Disboard-AutoBumpTool-selfbot
   ```

4. Create and edit the `.env` file:
   ```bash
   nano .env
   ```
   Add your configuration details to the `.env` file as required, then save and exit (`Ctrl+X`, `Y`, `Enter`).

5. **If you cannot find your `.env` file, make sure to run this command**:
   ```bash
   npm install dotenv
   ```

6. Install the necessary dependencies:
   ```bash
   npm install
   ```

7. Update the packages:
   ```bash
   npm update
   ```

8. Run the script:
   ```bash
   node index.js
   ```

### For Windows Users

1. **Install Node.js**:
   - Download and install Node.js from [nodejs.org](https://nodejs.org/en).

2. **Download the repository**:
   - Download the ZIP file of the repository from [GitHub](https://github.com/Q3ucXftMpuG1/Disboard-AutoBumpTool-selfbot) and extract it to a folder of your choice.

3. **Find the folder location**:
   - Open File Explorer and navigate to the folder where you extracted the files. For example, it might be something like `C:\Users\local\Downloads\Disboard-AutoBumpTool-selfbot`.

4. **Open Command Prompt**:
   - Press `Win + R`, type `cmd`, and press `Enter` to open Command Prompt.

5. **Navigate to the folder**:
   - In Command Prompt, change directory to the folder where the files are located:
     ```cmd
     cd C:\Users\local\Downloads\Disboard-AutoBumpTool-selfbot
     ```

6. **Create and edit the `.env` file**:
   - Open `.env` in a text editor (such as Notepad) and add your configuration details, then save and close the file.

7. **If you cannot find your `.env` file, make sure to run this command**:
   ```cmd
   npm install dotenv
   ```

8. **Install the necessary dependencies**:
   ```cmd
   npm install
   ```

9. **Update the packages**:
   ```cmd
   npm update
   ```

10. **Run the script**:
    ```cmd
    node index.js
    ```

### Getting Your Discord Token

1. Open your web browser and go to [discord.com/login](https://discord.com/login).

2. Press `Ctrl+Shift+I` to open the Developer Console.

3. In the console, paste the following JavaScript code and press `Enter`:
   ```javascript
   (
       webpackChunkdiscord_app.push(
           [
               [''],
               {},
               e => {
                   m = [];
                   for (let c in e.c)
                       m.push(e.c[c]);
               }
           ]
       ),
       m
   ).find(
       m => m?.exports?.default?.getToken !== void 0
   ).exports.default.getToken()
   ```

4. You should see an output similar to this:
   ```
   'YOUR_DISCORD_TOKEN_HERE'
   ```

## Socials

- Join my Discord server: [Telekom](https://discord.gg/telekom)
- My Discord username: `casualguyyea`
