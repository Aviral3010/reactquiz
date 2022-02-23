import React, {useContext,useState} from 'react'
import Cong from '../../image/congratulations.png';
import userContext from '../../context/user/usercontext'
import axios from 'axios';




function Progress(props) {
  return (
    <tr>
      <td>Mock Test</td>
      <td >
        <div className="progress">
          <div className="progress-bar" role="progressbar" style={{ "width": "70%", "background-color": "#ac0dfd" }} aria-valuenow="70" aria-valuemin="0" aria-valuemax="100">70%</div>
        </div>
      </td>
      <td></td>
      <td>70%</td>
    </tr>
  )
}


function Scorecard() {
  const { auth, setauth } = useContext(userContext)
  const [data, setData] = useState('')

  const getscore = async () => {
    try {

      const config = {
        method: 'get',
        url: 'http://localhost:5000/user/getscore',
        headers: {
          'User-Agent': 'Axios - console app',
          'Content-Type': ' application/json',
          'auth-token': auth
        },

      }

      let res = await axios(config)

      console.log(res);
      // if ()
      if (res.status === 200) {
        setData(res.data)

      }


    } catch (error) {
      console.log(error, "catch");
      console.log(error.response.data)
      { alert(error.response.data.error) }

    }
  }
  return (
    <div>
      <>
      <button className='btn' onClick={getscore}>Click To View</button>
        <section id="sec" style={{ 'background': '#1eda5c', 'width': '68%', 'float': 'right', 'height': '600px', 'color': 'black', 'borderRadius': '20px' }}>
          <br />
          <center>
            <h1>Score card</h1>
            <br />
            <table style={{ "width": "800px" }} cellpadding='8px'>
              <tr>
                <th style={{ "width": "200px" }}>Quizes</th>
                <th style={{ "width": "350px" }}>Progress</th>
                <th style={{ "width": "100px" }}></th>
                <th>Score</th>
              </tr>
              {/* {(data.map((data, index) => {
                return (<Progress />)
              }))} */}
              {/* <!-- <tr>
                    <td></td>
                    <td>Average</td>
                    <td>80%</td>
                </tr> --> */}
            </table>
            <div>
              <img src={Cong} alt="" style={{ "height": "300px", "width": "400px" }} />
            </div>
          </center>
        </section>
      </>
    </div>
  )
}

export default Scorecard
