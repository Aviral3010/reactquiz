import React, { useContext, useEffect, useState, useCallback } from 'react'

import userContext from '../../context/user/usercontext'
import axios from 'axios';
import Testcard from './Testcard'

import { useNavigate } from 'react-router-dom'





function Instruction() {
  const { auth, setauth, setinsctruction, setscore, instruction, score } = useContext(userContext)
  const changetext = async () => {
    setinsctruction(false)


  }

  return (
    <>
      <div className="login">
        <h2>Instructions</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo, laudantium? Impedit ullam quaerat adipisci eaque quidem tempora dicta, sit architecto porro, commodi expedita perspiciatis. Omnis dolorum alias vero eum repellendus ratione a vitae soluta modi blanditiis odio, saepe quisquam quod.</p>
        <button className='btn btn-sucess' onClick={changetext}>Click</button>
      </div>
    </>
  )
}





function Inp(props) {
  const a = useContext(userContext)

  const handleclick = () => {
    if (props.onum === props.correctOp) {
      a.setscore(a.score + 1)
      console.log(a.score);
    }
  }
  return (
    <>

      <input type="radio" name={`question${props.qnum + 1}`} id={`question${props.qnum + 1}option${props.onum + 1}`} onChange={handleclick} />

      <label className='option' htmlFor={`question${props.qnum + 1}option${props.onum + 1}`}>{props.op}</label>
      <br />
    </>
  )
}














function Test(props) {

  const a = useContext(userContext)
  const [data, setData] = useState('')
  const navigate = useNavigate();
  const [qnum, setqnum] = useState(0)

  const [ques, setques] = useState([])
  const [ans, setans] = useState([])
  const [correct, setcorrect] = useState([])
  const [quiz, setquiz] = useState('')
  const [val, setval] = useState(0)

  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);

  const getdata = async () => {
    try {

      const config = {
        method: 'get',
        url: `http://localhost:5000/user/quiz/${props.type}`,
        headers: {
          'User-Agent': 'Axios - console app',
          'Content-Type': ' application/json',
          'auth-token': a.auth
        },

      }

      let res = await axios(config)

      console.log(res);
      // if ()
      if (res.status === 200) {


        return res.data
        // setlen(res.data.length)
      }


    } catch (error) {
      console.log(error, "catch");
      console.log(error.response.data)
      { alert(error.response.data.error) }

    }
  }
  useEffect(() => {
    const acll = async () => {
      var responseSet = await getdata()
      console.log(responseSet);
      responseSet.map(data => {

        // setques(...ques,[data.ques])
        // setans(...ans,[data.option])
        ques.push(data.ques)
        ans.push(data.option)
        correct.push(data.correct)

      })



      console.log('questions', ques);
      console.log('answer', ans);
    }
    acll()
  }, [])


  const handletest = async (val, co) => {
    // console.log(ques.length);
    if (ques.length - qnum - 1) {
      if (val === co) {
        await a.setscore(a.score + 1)
        console.log("this is score of if block " + a.score)
      }
      await setqnum(qnum + 1)

    } else {
      console.log("this is score of else block " + a.score, typeof (a.score))
      try {

        const da = {
          marks: a.score,
          total: ques.length,
          quiz: "gk"
        }

        let headersList = {
          "Accept": "*/*",
          // "User-Agent": "Thunder Client (https://www.thunderclient.com)",
          "auth-token": a.auth,
          "Content-Type": "application/json"
        }

        let bodyContent = JSON.stringify({
          "marks": a.score,
          "total": ques.length,
          "quiz": props.type
        });

        fetch("http://localhost:5000/user/score", {
          method: "POST",
          body: bodyContent,
          headers: headersList
        }).then(function (response) {
          return response.text();
        }).then(function (data) {
          console.log(data);

        })
        navigate(-1)



      } catch (error) {
        console.log(error, "catch");
        console.log(error.response.data)
      }



    }

  }
  // useEffect(() => {

  // }, [qnum])


  if (a.insctruction) {
    return <Instruction />
  } else {
    console.log(ques.length);
    return (
      <>
        <h1>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum quod nihil tempore?</h1>
        <h4>{qnum + 1} of {ques.length}</h4>
        <p>{ques[qnum]}</p>
        <div>

          {/* {ans[qnum].map((da, index) => {
            return (<Inp op={da} qfor={qnum} onum={index} key={index} correctOp={correct} />)
          })} */}

          <div
            className="radio-btn"
            onClick={() => {
              console.log('first ', a.score);
              setval(0);
            }}
          >
            <input
              type="radio"
              value={val}
              name="tripType"
              checked={val === 0}
            />{ans[qnum][0]}
          </div>


          <div
            className="radio-btn"
            onClick={() => {
              setval(1);
              console.log('second ', a.score);

            }}
          >
            <input
              type="radio"
              value={val}
              name="tripType"
              checked={val === 1}
            />{ans[qnum][1]}
          </div>


          <div
            className="radio-btn"
            onClick={() => {
              setval(2);
              console.log('third ', a.score);

            }}
          >
            <input
              type="radio"
              value={val}
              name="tripType"
              checked={val === 2}
            />{ans[qnum][2]}
          </div>


          <div
            className="radio-btn"
            onClick={() => {
              setval(3);
              console.log('forth ', a.score);

            }}
          >

            <input
              type="radio"
              value={val}
              checked={val === 3}
            />{ans[qnum][3]}
          </div>


          <button className='btn btn-success' onClick={() => { handletest(val, correct[qnum]) }}>next</button>

        </div>


      </>
    )
  }
}



















export default Test
