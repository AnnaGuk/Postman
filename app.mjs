import { createPostmanAppGui } from "./scripts/helpers.mjs";

const appRef = document.body;
const supportedMethods = ["get", "post", "put", "patch", "delete"];

const app = createPostmanAppGui({ methods: supportedMethods });
appRef.appendChild(app);
