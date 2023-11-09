export type RelpgTableColumnType = {
    field: string;
    datatype: string;
    Constraints: string;
};
export type RelpgTableType = {
    name: string;
    Constraints: string;
    Force: boolean;
};
export type RelpgModelType = {
    table: RelpgTableType;
    column: RelpgTableColumnType;
};
export type RelModelsType = {
    models: RelpgModelType[];
};
