import {Static, Type} from '@sinclair/typebox';
import {Value} from '@sinclair/typebox/value';
import {TypeCompiler} from '@sinclair/typebox/compiler';

const Bar = Type.Object({x: Type.Number()}, {$id: 'Bar'});

const Foo = Type.Object({bar: Type.Ref(Bar)});

type TBar = Static<typeof Bar>;
type TFoo = Static<typeof Foo, [typeof Bar]>;

const FooCheck = TypeCompiler.Compile(Foo, [Bar]);

const input = {bar: {x: 1}};

const is_valid = FooCheck.Check(input);
if (is_valid) {
	const value: TFoo = Value.Cast(Foo, [Bar], input);
	console.log(JSON.stringify(value));
} else {
	const errors = [...FooCheck.Errors(input)];
	console.log(JSON.stringify(errors));
}