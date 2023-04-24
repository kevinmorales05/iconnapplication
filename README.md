# Introduction 
Iconn App is the new mobile application for Iconn company. Developed by Citi.

# Getting Started
1.	Configure your ssh key in your computer
2.	run: `git clone git@ssh.dev.azure.com:v3/CITIValue/ICONN/rn-iconn-application`
3.	run: `yarn`
4.	run: `npx pod-install`

# Main Technologies
This project uses: 
1. React Native 0.68.2 
2. Typescript 4.4.4
3. @react-navigation 6.x
4. axios 0.27.2
5. react-hook-form 7.32.1
2. Firebase authetication https://firebase.google.com/docs/auth
3. Redux toolkit https://redux-toolkit.js.org/

# Testing deep links
- In order to test the deep links you just need to run this in the terminal
 # Open login screen
 - npx uri-scheme open "iconn://iconn/continuewith" --android

  - npx uri-scheme open "iconn://iconn/continuewith" --ios

# open invoicing scren
 - npx uri-scheme open "iconn://iconn/invoice" --android

 - npx uri-scheme open "iconn://iconn/invoice" --ios

 # this version is for Juan Pablo Larios 