import type { ColumnBuilderBaseConfig, ColumnBuilderRuntimeConfig, MakeColumnConfig } from '~/column-builder.ts';
import type { ColumnBaseConfig } from '~/column.ts';
import { entityKind } from '~/entity.ts';
import type { AnyMySqlTable } from '~/mysql-core/table.ts';
import { MySqlColumnBuilderWithAutoIncrement, MySqlColumnWithAutoIncrement } from './common.ts';

export type MySqlFloatBuilderInitial<TName extends string> = MySqlFloatBuilder<{
	name: TName;
	dataType: 'number';
	columnType: 'MySqlFloat';
	data: number;
	driverParam: number | string;
	enumValues: undefined;
	generated: undefined;
}>;

export class MySqlFloatBuilder<T extends ColumnBuilderBaseConfig<'number', 'MySqlFloat'>>
	extends MySqlColumnBuilderWithAutoIncrement<T>
{
	static override readonly [entityKind]: string = 'MySqlFloatBuilder';

	constructor(name: T['name']) {
		super(name, 'number', 'MySqlFloat');
	}

	/** @internal */
	override build<TTableName extends string>(
		table: AnyMySqlTable<{ name: TTableName }>,
	): MySqlFloat<MakeColumnConfig<T, TTableName>> {
		return new MySqlFloat<MakeColumnConfig<T, TTableName>>(table, this.config as ColumnBuilderRuntimeConfig<any, any>);
	}
}

export class MySqlFloat<T extends ColumnBaseConfig<'number', 'MySqlFloat'>> extends MySqlColumnWithAutoIncrement<T> {
	static override readonly [entityKind]: string = 'MySqlFloat';

	getSQLType(): string {
		return 'float';
	}
}

export function float(): MySqlFloatBuilderInitial<''>;
export function float<TName extends string>(name: TName): MySqlFloatBuilderInitial<TName>;
export function float(name?: string) {
	return new MySqlFloatBuilder(name ?? '');
}
