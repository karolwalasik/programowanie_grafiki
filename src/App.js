import './App.css';
import styled from 'styled-components'

import { multiply } from 'mathjs'
import React from 'react';

const GridWrapper = styled('div')`
  border:1px solid grey;
  width: max-content;
  display: grid;
  grid-template-columns: repeat(8, 20px);
  grid-template-rows: repeat(8, 20px);
`
function App() {
    const startMatrix = [
        [1,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,1,0,0,1,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,1,0],
    ]

    let weightsMatrix64x64 =Array.from(Array(64).fill(undefined), () => new Array(64).fill(undefined));
    

    function calculateWeight(matrix){
        console.log('l',matrix.length)
        for(let i =0;i<64;i++){
            for(let j=0;j<64;j++){
                if(i===j){
                    weightsMatrix64x64[i][j]=0
                }else{
                    weightsMatrix64x64[i][j] = (2*matrix[i]-1)*(2*matrix[j]-1)
                    weightsMatrix64x64[j][i] = (2*matrix[i]-1)*(2*matrix[j]-1)
                }
            }
        }
        return weightsMatrix64x64
    }

    function fi (el,i,inputMatrix){
        console.log('e',el,i,inputMatrix[i])
        if(el>0){
            return 1
        }else if(el<0){
            return 0
        }else{
            //zwroc to co na wejsciu
            return inputMatrix[i]
        }
    }
    
    const [inputValue,setI] = React.useState('')
    const [resultMatrix,setResult] = React.useState([])
    let testMatrix;
    const handleSetInput = (e) => {
        setI(e.target.value)
    }
    const handleClick = () =>{
        testMatrix=[...inputValue].map(e=>Number(e));
        if(testMatrix.length===64){
        const weights = (calculateWeight(startMatrix.flat()))
        const m = multiply(testMatrix,weights)
        const result = m.map((el,i)=>fi(el,i,testMatrix));
        setResult(result)
        }
    }

    const inputAsArray = [...inputValue]
    
  return (
    <div className="App">
        <div>
            <input maxLength={64} value={inputValue} onChange={handleSetInput} />
            <button onClick={handleClick}>click</button>
        </div>
        <p>start</p>
        {!!startMatrix.length && <GridWrapper>
            {startMatrix.flat().map(el=><span>{el}</span>)}
        </GridWrapper>}

        {!!inputAsArray.length &&<> <p>test</p>
            <GridWrapper>
                {inputAsArray.map(el=><span>{el}</span>)}
            </GridWrapper>
        </> }

        {!!resultMatrix.length && <><p>wynik</p>
            <GridWrapper>
            {resultMatrix.map(el=><span>{el}</span>)}
        </GridWrapper></>}

    </div>
  );
}

export default App;
