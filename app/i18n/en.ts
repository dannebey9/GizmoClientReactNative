const en = {
  common: {
    ok: "OK!",
    cancel: "Cancel",
    back: "Back",
  },
  welcomeScreen: {
    postscript:
      "psst  — This probably isn't what your app looks like. (Unless your designer handed you these screens, and in that case, ship it!)",
    readyForLaunch: "Your app, almost ready for launch!",
    exciting: "(ohh, this is exciting!)",
    button: "Let's do this!",
  },
  connectionsScreen: {
    title: "My Connections",
    listEmptyText: "No connections yet",
    btnAddConnection: "Add Connection",
    btnDeleteConnection: "Delete",
    btnEditConnection: "Edit",
  },
  clubHostsScreen: {
    title: "Club Hosts",
  },
  addConnectionScreen: {
    title: "Add Connection",
    namePlaceholder: "Connection Name",
    addressPlaceholder: "Connection ip address or domain",
    portPlaceholder: "Connection port",
    usernamePlaceholder: "Username",
    passwordPlaceholder: "Password",
    btnSave: "Add Connection",
    btnUpdate: "Update Connection",
  },
  clubConnectionScreen: {
    title: "Club Connection",
    loadingText: "We are trying to connect to the club...",
    btnCancel: "Cancel",
    errorText: "Error",
    errorDescription:
      "An error occurred while connecting to the club. Check your connection settings and try again.",
    successText: "Success",
    successDescription: "Successfully connected to the club.",
  },
  errorScreen: {
    title: "Something went wrong!",
    friendlySubtitle:
      "This is the screen that your users will see in production when an error is thrown. You'll want to customize this message (located in `app/i18n/en.ts`) and probably the layout as well (`app/screens/ErrorScreen`). If you want to remove this entirely, check `app/app.tsx` for the <ErrorBoundary> component.",
    reset: "RESET APP",
  },
  emptyStateComponent: {
    generic: {
      heading: "So empty... so sad",
      content: "No data found yet. Try clicking the button to refresh or reload the app.",
      button: "Let's try this again",
    },
  },
}

export default en
export type Translations = typeof en
