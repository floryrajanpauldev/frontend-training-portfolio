# MPA vs SPA

## Multi-Page Application (MPA)
An MPA has multiple HTML pages. A navigation/request can cause the server to return a new document for the requested page.

## Single-Page Application (SPA)
In a React SPA, the initial request loads the React application. Client-side routing can then change the UI without requesting a completely new HTML document for every route.

## Key idea
MPA: navigation commonly results in a new document from the server.
SPA: the React app remains loaded and the router changes the displayed UI.
