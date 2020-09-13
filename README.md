# chrome-jotform-extension

Task manager app using JotFormAPI to store data. It overrides default new tab on Chrome

## How to Install

1. Clone the project repository
2. Run `yarn build` command in the project folder
3. On Chrome, open the Extension Management page by navigating to `chrome://extensions`
4. Enable Developer Mode by clicking the toggle switch next to **Developer mode**
5. Click the **LOAD UNPACKED** button and select the **build** folder in the project folder
6. Enjoy managing your life with this app

## Features

User can:
- enter his/her JotForm API Key to use it as database
- logout from current account and login with different API Key
- add or remove shortcut to searchbar (e.g. **!h** for **how to**)
- type in short form (**!h**) to searchbar to get long form (**how to**)
- add, remove, order lists and can change their name
- add or remove elements to a list and can mark an element as done
- change an element's name, order them, drag them to another list
- can decide which elements should be visible (All, Active, Completed)
- can copy a list and filter lists by their name
- can change the color of a list 
