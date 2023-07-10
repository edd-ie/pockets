import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Savings.css';


export default function Savings({userID}) {
  const [saving, setSaving] = React.useState([]);
  const [sims, setSims] = React.useState([]);
  const [cards, setCards] = React.useState([]);
  const [category, setCategory] = React.useState([])


  useEffect(() => {

    fetch(`https://pockets.onrender.com/userSaves/${userID}`)
    .then(res => res.json())
    .then(data => {
      
      let dataset = []
      for(let saves of data){
        dataset.push({id: saves.id, name: saves.name, goal: saves.goal,
          time: saves.duration, sim:saves.simContrib, card: saves.cardContrib,
          remaining: saves.Remaining
        })
      }
      setSaving(dataset)

    })
    .catch(err => console.log(err))

    fetch(`https://pockets.onrender.com/userCards/${userID}`)
    .then(res => res.json())
    .then(data => {
      let dataset = []
      for(let cards of data){
        dataset.push({id: cards.id, name: cards.name})
      }
      setCards(dataset)
      setCategory(dataset)
    })

    fetch(`https://pockets.onrender.com/userSims/${userID}`)
    .then(res => res.json())
    .then(data => {
      let dataset = []
      for(let sims of data){
        dataset.push({id: sims.id, name: sims.name})
      }
      setSims(dataset)
      
    })
  },[])

  const [showAdd, setAdd] = React.useState(false);

  function handleAdd(){
    setAdd(!showAdd)
  }
  const [showNew, setNew] = React.useState(false);

  function handleNew(){
    setNew(!showNew)
  }

  let showSaves = saving.map((save)=>{
    return(
      <div className='eSavings' key={save.id}>
        <div className='eSaveDetails' key={'details'+save.id}>
          <h2>{save.name}</h2>
          <p><span>Goal:</span> {save.goal}</p>
          <p><span>Time:</span> {save.time} months</p>
          <p><span>Sim Contribution:</span> {save.sim}</p>
          <p><span>Card Contribution:</span> {save.card}</p>
          <p><span>Remaining:</span> {save.remaining}</p>
        </div>
        <div className='eSaveOptions' key={'options'+save.id}>
          <div className='eSaveEdit' id='eSaveUP' key={'edit'+save.id} onClick={()=>handleSaveUp(save.id,save.name)}>
            <p>Save up</p>
          </div>
          <div className='eSaveEdit' key={'del'+save.id+1} onClick={()=>handleDelete(save.id)}>
            <p>Delete</p>
          </div>
        </div>
      </div>
    )
  })

  function handleDelete(id){
    let choice = confirm("Are you sure you want to delete this save? ")
    if(choice){
      fetch(`https://pockets.onrender.com/savings/${id}`,{
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'}
      })
      .then(res => res.json())
      .then(
      fetch(`https://pockets.onrender.com/userSaves/${userID}`)
      .then(res => res.json())
      .then(data => {
        
        let dataset = []
        for(let saves of data){
          dataset.push({id: saves.id, name: saves.name, goal: saves.goal,
            time: saves.duration, sim:saves.simContrib, card: saves.cardContrib,
            remaining: saves.Remaining
          })
        }
        setSaving(dataset)

      })
      .then(
        fetch(`https://pockets.onrender.com/userSaves/${userID}`)
        .then(res => res.json())
        .then(data => {
          
          let dataset = []
          for(let saves of data){
            dataset.push({id: saves.id, name: saves.name, goal: saves.goal,
              time: saves.duration, sim:saves.simContrib, card: saves.cardContrib,
              remaining: saves.Remaining
            })
          }
          setSaving(dataset)

        })
        .catch(err => console.log(err))
      )
      
    )

    }
  }

  function handleChoice(e){
    let choice = e.target.value
    
    if(choice == 'sim'){
      setCategory(sims)
    }
    else{
      setCategory(cards)
    }
  }

  let userChoice = category.map((choice)=>{
    return(
      <option value={choice.id} key={choice.id}>
        {choice.name}
      </option>
    )
  })

  function handleNewSave(e){
    e.preventDefault()
    let form = e.target
    let goal = form[0].value
    let amount = form[1].value
    let duration = form[2].value
    let id = userID

    let dataset = {
      name: goal,
      goal: parseInt(amount),
      duration: parseInt(duration),
      user_id: id
    }
    

    fetch("https://pockets.onrender.com/savings",{
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(dataset)
    }).then(res => res.json())
    .then(
      fetch(`https://pockets.onrender.com/userSaves/${userID}`)
      .then(res => res.json())
      .then(data => {
        
        let dataset = []
        for(let saves of data){
          dataset.push({id: saves.id, name: saves.name, goal: saves.goal,
            time: saves.duration, sim:saves.simContrib, card: saves.cardContrib,
            remaining: saves.Remaining
          })
        }
        setSaving(dataset)

      })
      .then(
        fetch(`https://pockets.onrender.com/userSaves/${userID}`)
        .then(res => res.json())
        .then(data => {
          
          let dataset = []
          for(let saves of data){
            dataset.push({id: saves.id, name: saves.name, goal: saves.goal,
              time: saves.duration, sim:saves.simContrib, card: saves.cardContrib,
              remaining: saves.Remaining
            })
          }
          setSaving(dataset)

        })
        .catch(err => console.log(err))
      )
      
    )

    form.reset()
    setNew(!showNew)
  }

  const[saveKey, setSaveKey] = React.useState([])

  function handleSave(e){
    e.preventDefault()
    
    let form = e.target
    let amnt = form[0].value
    let choice = form[1].value
    let choiceID = form[2].value

    let id = saveKey[0]
    let name = saveKey[1]

    let dataSet = {}
    let url = ''
    
    if(choice == 'card'){
      dataSet.goalName = name
      dataSet.amount = parseInt(amnt)
      dataSet.card_id = parseInt(choiceID)
      dataSet.saving_id = id
      url = 'https://pockets.onrender.com/save_cards'
    }
    else{
      dataSet.goalName = name
      dataSet.amount = parseInt(amnt)
      dataSet.sim_id = parseInt(choiceID)
      dataSet.saving_id = id
      url = 'https://pockets.onrender.com/save_sims'
    }
    
    fetch(url,{
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(dataSet)
    })
    .then(res => res.json())
    .then(
      fetch(`https://pockets.onrender.com/userSaves/${userID}`)
      .then(res => res.json())
      .then(data => {
        
        let dataset = []
        for(let saves of data){
          dataset.push({id: saves.id, name: saves.name, goal: saves.goal,
            time: saves.duration, sim:saves.simContrib, card: saves.cardContrib,
            remaining: saves.Remaining
          })
        }
        setSaving(dataset)

      })
      .then(
        fetch(`https://pockets.onrender.com/userSaves/${userID}`)
        .then(res => res.json())
        .then(data => {
          
          let dataset = []
          for(let saves of data){
            dataset.push({id: saves.id, name: saves.name, goal: saves.goal,
              time: saves.duration, sim:saves.simContrib, card: saves.cardContrib,
              remaining: saves.Remaining
            })
          }
          setSaving(dataset)

        })
        .catch(err => console.log(err))
      )
      
    )
    
    form.reset()
    setAdd(!showAdd)
  }

  function handleSaveUp(id, name){
    setSaveKey([id, name])
    setAdd(!showAdd)
  }

  return(
    <div id='eSavingsMain'>
      <h1 id='eSavingsTitle'>Savings</h1>
      <Link to='/'>
        <div id='mainLogo'>
          <h1>POC<span>KETS</span></h1>
        </div>
      </Link>

      <div id='eSavingsContent'>
        {showSaves}
      </div>

      <div id='eSavingsNew' onClick={handleNew}>
        <p>New Goal</p>
      </div>

      {showAdd&&
      <div className='eNewSave'>
        <div className='eNewSaveContent'>
          <div className='eNewSaveHeader'>
            <h1>New Contribution</h1>
          </div>

          <div className='eNewSaveBody'>
            <form action="submit" onSubmit={handleSave} className="eNewSaveForm">
              <input type="number" required placeholder='Amount'/>
              <select id='eSelectChoice'  onChange={handleChoice}>
                <option value="card">Card Contribution</option>
                <option  value="sim">Sim Contribution</option>
              </select>
              <select name="choice">
                {userChoice}
              </select>
              <button type='submit'>Save</button>
            </form>
          </div>          
        </div>
      </div>}

      {showNew&&
      <div className='eNewSave'>
        <div className='eNewSaveContent'>
          <div className='eNewSaveHeader'>
            <h1>Saving</h1>
          </div>

          <div className='eNewSaveBody' onSubmit={handleNewSave}>
            <form action="submit" className="eNewSaveForm">
              <input type="text" required placeholder='Goal name'/>
              <input type="number" required placeholder='Goal amount'/>
              <input type="number" required placeholder='Duration (months)'/>
              <button type='submit'>Add</button>
            </form>
          </div>          
        </div>
      </div>}


    </div>
  )
}