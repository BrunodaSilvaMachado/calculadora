export class Addiction{
    operation = (a, b) => {return a + b}
}

export class Subtration{
    operation = (a, b) => {return a - b}
}

export class Multiplication{
    operation = (a, b) => {return a * b}
}

export class Division{
    operation = (a, b) => {return (b !== 0)? a / b: NaN}
}

export class Percentation{
    operation = (a, b, op) => {
        const c = b/100;
        return (op instanceof Multiplication || op instanceof Division)? op.operation(a,c): op.operation(a,a*c);
    }
}

