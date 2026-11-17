# Leads Tracker — student starter

Build an app that saves website links, displays them live, and deletes the list.
The HTML, styling, icons, URL validation and most JavaScript are ready. Complete
five small TODOs in `index.js`; each comment tells you what to add.
This package contains no instructor Firebase configuration or saved data.

## 1. Create your own database

1. Sign in at https://console.firebase.google.com/ and create a project.
2. Open **Build > Realtime Database** (the menu may say **Databases and storage**).
   Choose **Create database** and select a location. Use Realtime Database,
   not Cloud Firestore.
3. For this short classroom exercise, choose **test mode**. Test rules allow
   other people to read and change your data until they expire. Use only dummy
   links. Do not put personal or sensitive information in this project.
4. Open the database's **Data** tab and copy its database URL. It normally ends
   in `firebaseio.com` or `firebasedatabase.app`. Paste it into TODO 1.
5. Inspect the **Rules** tab. Rules control access; a database URL is not a
   password. Before using this app publicly, add authentication and rules that
   restrict each user to their own data and validate writes. Client-side URL
   validation helps the UI but can be bypassed by other database clients.
6. When the exercise is over, close public access in the Rules tab (set
   `.read` and `.write` to `false` and publish). This intentionally stops the app
   from reading and saving until you implement appropriate access rules.

No Firebase CLI, npm packages, private keys or service-account files are needed.
The Firebase SDK loads from Google's CDN, so an internet connection is required.

## 2. Run the starter

Unzip the package and open the `leads-tracker` folder in your editor. Use
IntelliJ's browser preview or VS Code's Live Server to serve `index.html`.
Alternatively, if Python 3 is installed, open a terminal in this folder and run:

```sh
python3 -m http.server 8000
```

Visit http://localhost:8000. Do not open the HTML using a `file://` URL.
Before TODO 1, the buttons are disabled and the page displays a setup message.

## 3. Complete the JavaScript

| TODO | What you complete | What it teaches |
| --- | --- | --- |
| 1 | Add your database URL | Configuration |
| 2 | Create a reference to `trackLeads` | Database paths |
| 3 | Append the link and list item | DOM rendering and loops |
| 4 | Replace the placeholder error with the save call | Events, `push`, `await` |
| 5 | Replace the placeholder error with the delete call | `remove` and live updates |

Save `index.js` and refresh the browser after each change. For TODOs 4 and 5,
**replace** the `throw new Error(...)` line; leaving it in place stops the action.
The `onValue` listener is already implemented: it receives database changes,
converts the saved object to an array, and calls `render`.

## 4. Check your finished app

- Save `https://example.com`: a clickable link should appear and the input clears.
- Refresh: the saved link should remain.
- Try blank input, spaces, `G`, `example.com` and `javascript:alert(1)`:
  each should show a validation error and create no database entry.
- Try `  https://example.com  `: surrounding spaces should be removed.
- Open a second browser tab: changes should appear in both tabs because they
  use the same database. All users connected to this path share the same list.
- Double-click **DELETE ALL**: every saved link should disappear in both tabs
  and remain gone after refresh. A single click does not delete anything.
  Use a desktop browser for this check; mobile double-tap handling varies.
- If a save fails, the input should remain and an error should appear.

## Troubleshooting

- **Permission denied:** check your own database rules and test-mode expiration.
- **Setup message:** finish TODOs 1 and 2, save the file, and refresh.
- **Saved but no links visible:** check both append statements in TODO 3.
- **Complete TODO error:** replace the placeholder throw in TODO 4 or 5.
- **Nothing runs:** check the browser console, internet access and HTTP server.
- **Old code after publishing:** try a private tab or hard refresh; GitHub Pages
  deployment and browser caches can take time to update.

## Included files

- `index.html`: the page and controls.
- `index.css`: the supplied app styling.
- `index.js`: guided starter with five TODOs.
- `site.webmanifest` and image files: browser icons with relative paths, suitable
  for hosting in a GitHub Pages subfolder.

This is the website version. A Chrome extension manifest and SAVE TAB feature
are not included; reading browser tabs requires a separate extension setup.
The web manifest supplies appearance metadata, not offline support.
