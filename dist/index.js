"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const api_1 = __importDefault(require("./src/api"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const port = 4000;
app.use('/api', api_1.default);
app.get('/', (req, res) => {
    res.send('Welcome to Cricket Match API');
});
app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on port ${port}`);
});
