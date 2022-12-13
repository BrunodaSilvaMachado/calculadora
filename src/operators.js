export class IOperator{
    constructor(){
        if(this.constructor == IOperator){
            throw new Error(" Object of Abstract Class cannot be created");
        }
    }
}

export class IUnitaryOperator{
    constructor(){
        if(this.constructor == IUnitaryOperator){
            throw new Error(" Object of Abstract Class cannot be created");
        }
    }
}

export class ITernaryOperator{
    constructor(){
        if(this.constructor == ITernaryOperator){
            throw new Error(" Object of Abstract Class cannot be created");
        }
    }
}

//Todo: padronizar interface dos operadores
export class Addiction extends IOperator{
    operation = (a, b) => {return a + b}
}

export class Subtration extends IOperator{
    operation = (a, b) => {return a - b}
}

export class Multiplication extends IOperator{
    operation = (a, b) => {return a * b}
}

export class Division extends IOperator{
    operation = (a, b) => {return (b !== 0)? a / b: NaN}
}

export class Percentation extends ITernaryOperator{
    operation = (a, b, op) => {
        const c = b/100;
        return (op instanceof Multiplication || op instanceof Division)? op.operation(a,c): op.operation(a,a*c);
    }
}
// Operadores unitários
export class Square extends IUnitaryOperator{
    operation = (a) =>{return a* a}
}

export class Sqrt extends IUnitaryOperator{
    operation = (a) =>{return Math.sqrt(a)}
}

export class Inverse extends IUnitaryOperator{
    operation = (a) =>{return (a != 0)? 1/a: NaN}
}

export class Base10 extends IUnitaryOperator{
    operation = (a) =>{return Math.pow(10,a)}
}

export class Signal extends IUnitaryOperator{
    operation = (a) =>{return (a == 0)? 0: -a;}
}