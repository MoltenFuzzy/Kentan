"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const apollo_server_1 = require("apollo-server");
const apollo_server_core_1 = require("apollo-server-core");
const type_graphql_1 = require("type-graphql");
const resolvers_1 = require("./resolvers/resolvers");
const db_1 = __importDefault(require("./config/db"));
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const schema = yield (0, type_graphql_1.buildSchema)({
        resolvers: resolvers_1.resolvers,
    });
    const server = new apollo_server_1.ApolloServer({
        schema,
        introspection: true,
        csrfPrevention: true,
        cache: "bounded",
        plugins: [(0, apollo_server_core_1.ApolloServerPluginLandingPageLocalDefault)({ embed: true })],
    });
    (0, db_1.default)();
    server.listen().then(({ url }) => {
        console.log(`Server ready at ${url}`);
    });
});
main();
//# sourceMappingURL=index.js.map