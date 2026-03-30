import { GraphQLScalarType, GraphQLError, Kind } from 'graphql';

export const GraphQLMoney = new GraphQLScalarType({
    name: 'Money',
    description:
        'Monetary values stored as integers (e.g. cents). Supports values beyond the 32-bit Int limit up to Number.MAX_SAFE_INTEGER.',
    serialize(value: unknown): number {
        const num = Number(value);
        if (!Number.isInteger(num)) {
            throw new GraphQLError(`Money scalar requires an integer value, got: ${value}`);
        }
        if (num > Number.MAX_SAFE_INTEGER || num < Number.MIN_SAFE_INTEGER) {
            throw new GraphQLError(`Money scalar value ${num} exceeds safe integer bounds`);
        }
        return num;
    },
    parseValue(value: unknown): number {
        const num = Number(value);
        if (!Number.isInteger(num)) {
            throw new GraphQLError(`Money scalar requires an integer value, got: ${value}`);
        }
        return num;
    },
    parseLiteral(ast): number {
        if (ast.kind !== Kind.INT) {
            throw new GraphQLError(`Money scalar requires an integer literal, got: ${ast.kind}`);
        }
        return parseInt(ast.value, 10);
    },
});
