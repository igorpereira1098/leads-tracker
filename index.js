import { initializeApp } from "https://www.gstatic.com/firebasejs/13.2.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove }
    from "https://www.gstatic.com/firebasejs/13.2.0/firebase-database.js"

// STUDENT STARTER: complete TODOs 1–5. See README.md for setup and checks.
// The UI, validation, live updates and error handling are supplied for you.
const firebaseConfig = {
    // TODO 1: Paste YOUR Firebase Realtime Database URL between the quotes.
    // Copy it from Firebase Console > Realtime Database > Data.
    // Use the database URL, not a Firebase console page URL or project ID.
    databaseURL: "https://leads-tracker-app-f701a-default-rtdb.europe-west1.firebasedatabase.app/"
}

const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const deleteBtn = document.getElementById("delete-btn")
const ulEl = document.getElementById("ul-el")
const statusEl = document.getElementById("status-el")

// Return a normalized HTTP(S) URL, or null if the input is invalid.
// Blank strings, bare words, relative links and javascript: links are rejected.
function validateUrl(value) {
    if (typeof value !== "string") return null
    try {
        const url = new URL(value.trim())
        return ["http:", "https:"].includes(url.protocol) ? url.href : null
    } catch {
        return null
    }
}

function render(leads) {
    ulEl.replaceChildren()
    for (const lead of leads) {
        const url = validateUrl(lead)
        if (!url) continue // Skip invalid values already in the database.

        const li = document.createElement("li")
        const link = document.createElement("a")
        link.href = url
        link.textContent = url // Treat saved text as text, never as HTML.
        link.target = "_blank"
        link.rel = "noopener noreferrer"

        // TODO 3: Add the link to the list item, then the item to the list.
        // Use li.append(link) followed by ulEl.append(li).

        li.append(link)
        ulEl.append(li)
    }
}

inputEl.addEventListener("input", function() {
    inputEl.setCustomValidity("")
})

// Keep the starter disconnected until the student supplies a database URL.
if (!firebaseConfig.databaseURL.trim()) {
    statusEl.textContent = "Start with TODO 1 in index.js: add your own database URL."
    inputBtn.disabled = true
    deleteBtn.disabled = true
} else {
    startApp()
}

function startApp() {
    const app = initializeApp(firebaseConfig)
    const database = getDatabase(app)

    // TODO 2: Replace null with ref(database, "trackLeads").
    // A reference identifies the location where this app stores its list.
    const referenceInDB = ref(database, "trackLeads")

    if (!referenceInDB) {
        statusEl.textContent = "Complete TODO 2 to connect your leads list."
        inputBtn.disabled = true
        deleteBtn.disabled = true
        return
    }

    // Firebase calls this when data first loads and whenever it changes.
    onValue(referenceInDB, function(snapshot) {
        const leads = snapshot.exists() ? Object.values(snapshot.val()) : []
        render(leads) // An empty array also clears the list after deletion.
    }, function(error) {
        statusEl.textContent = "Could not load leads: " + error.message
    })

    inputBtn.addEventListener("click", async function() {
        const url = validateUrl(inputEl.value)
        if (!url) {
            inputEl.setCustomValidity("Enter a valid URL starting with http:// or https://.")
            inputEl.reportValidity()
            return // Nothing is sent to Firebase when validation fails.
        }
        inputEl.setCustomValidity("")
        inputBtn.disabled = true
        statusEl.textContent = "Saving…"
        const originalInput = inputEl.value
        try {
            // TODO 4: Replace the throw below with:
            // await push(referenceInDB, url)
            // push creates a new entry; await waits for Firebase to accept it.
            await push(referenceInDB, url)

            // Clear only after a successful save, preserving any newer typing.
            if (inputEl.value === originalInput) inputEl.value = ""
            statusEl.textContent = "Lead saved."
        } catch (error) {
            statusEl.textContent = "Could not save: " + error.message
        } finally {
            inputBtn.disabled = false
        }
    })

    // Double-click DELETE ALL to delete every lead in this database location.
    deleteBtn.addEventListener("dblclick", async function() {
        deleteBtn.disabled = true
        statusEl.textContent = "Deleting…"
        try {
            // TODO 5: Replace the throw below with:
            // await remove(referenceInDB)
            // The onValue listener will then refresh the list automatically.
            await remove(referenceInDB)
            statusEl.textContent = "All leads deleted."
        } catch (error) {
            statusEl.textContent = "Could not delete: " + error.message
        } finally {
            deleteBtn.disabled = false
        }
    })
}
