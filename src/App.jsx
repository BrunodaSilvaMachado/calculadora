import React, { useState } from "react";
import { Container, Content, Row } from "./styles";
import Input from "./components/Input";
import Button from "./components/Button";
import { Addiction, Subtration, Multiplication, Division, Percentation, IOperator, ITernaryOperator, Base10, Inverse, Square, Sqrt, Signal} from "./operators";

const App = () => {
  const [currentNumber, setCurrentNumber] = useState("0");
  const [lastNumber, setLastNumber] = useState("");
  const [operation, setOperation] = useState(null);
  const [solved, isSolve] = useState(false); //Todo: fazer melhor

  const solve = (op, other_op) => {
    const a = Number(lastNumber);
    const b = Number(currentNumber);
    if (op instanceof IOperator)
      return op.operation(a, b);
    else if(op instanceof ITernaryOperator){
      return op.operation(a, b, other_op);
    }else {
      return op.operation(b);
    }
  };

  const handleClearAll = () => {
    setCurrentNumber("0");
    setLastNumber("");
    setOperation(null);
    isSolve(false);
  };

  const handleRemoveNumber = () => {
    setCurrentNumber((prev) => {
      const r = prev.substring(0, prev.length - 1);
      if (r === "" || r === "-" || solved) {
        isSolve(false);
        return "0"; 
      } 
      return r;
    });
  };

  const handleAddNumber = (number) => {
    setCurrentNumber((prev) =>{
      const r = (prev === "0") ? `${number}` : `${prev}${number}`;
      if (lastNumber !== "" && operation !== null || solved){
        isSolve(false);
        return `${number}`;
      } 
      return r;
    }
      
    );
  };

  const handleDecimal = () => {
    setCurrentNumber((prev) =>
      prev.includes(".")? `${prev}` : `${prev}.`
    );
  };

  const handleEqual = () => {
    if (!lastNumber !== "" && operation !== null && currentNumber !== "0") {
      setCurrentNumber(String(solve(operation)));
      setOperation(null);
      setLastNumber("");
      isSolve(true);
    }
  };

  const handleOperators = (funOp) => {
    if (lastNumber === "") {
      setLastNumber(currentNumber);
      setOperation(funOp);
    }else if(funOp !== null){
      const s = String(solve(operation));
      setLastNumber(s);
      setCurrentNumber(s);
      setOperation(funOp);
      isSolve(true);
    } 
  };

  const handleTernaryOperator = (funOp) => {
    if (!lastNumber !== "" && operation !== null && currentNumber !== "0") {
      const result = solve(funOp, operation)
      setCurrentNumber(String(result));
      setOperation(null);
      isSolve(true);
    }else{
      handleClearAll();
      isSolve(false);
    }
  };

  const handleUnitaryOperator = (funOp)=>{
    setCurrentNumber(String(solve(funOp)));
    setOperation(null);
    isSolve(true);
  }

  return (
    <Container>
      <Content>
        <Input value={currentNumber} />
        <Row>
          <Button label="%" onClick={()=>handleTernaryOperator(new Percentation())} />
          <Button label={<>10<sup>x</sup></>} onClick={() => handleUnitaryOperator(new Base10())} />
          <Button label="&larr;" onClick={handleRemoveNumber} />
          <Button label="C" onClick={handleClearAll} />
        </Row>
        <Row>
          <Button label="1/x" onClick={() => handleUnitaryOperator(new Inverse())} />
          <Button label="x&sup2;" onClick={() => handleUnitaryOperator(new Square())} />
          <Button label="&radic;" onClick={() => handleUnitaryOperator(new Sqrt())} />
          <Button
            label="&divide;"
            onClick={() => handleOperators(new Division())}
          />
        </Row>
        <Row>
          <Button label="7" onClick={() => handleAddNumber("7")} />
          <Button label="8" onClick={() => handleAddNumber("8")} />
          <Button label="9" onClick={() => handleAddNumber("9")} />
          <Button
            label="&times;"
            onClick={() => handleOperators(new Multiplication())}
          />
        </Row>
        <Row>
          <Button label="4" onClick={() => handleAddNumber("4")} />
          <Button label="5" onClick={() => handleAddNumber("5")} />
          <Button label="6" onClick={() => handleAddNumber("6")} />
          <Button label="-" onClick={() => handleOperators(new Subtration())} />
        </Row>
        <Row>
          <Button label="1" onClick={() => handleAddNumber("1")} />
          <Button label="2" onClick={() => handleAddNumber("2")} />
          <Button label="3" onClick={() => handleAddNumber("3")} />
          <Button label="+" onClick={() => handleOperators(new Addiction())} />
        </Row>
        <Row>
          <Button label="&plusmn;" onClick={()=>handleUnitaryOperator(new Signal())} />
          <Button label="0" onClick={() => handleAddNumber("0")} />
          <Button label="," onClick={handleDecimal} />
          <Button label="=" onClick={handleEqual} />
        </Row>
      </Content>
    </Container>
  );
};

export default App;
