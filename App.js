import React, { useState } from 'react';
import {Text,View,Image,TouchableOpacity,} from 'react-native';
const choices = [{name: 'rock',uri: 'http://pngimg.com/uploads/stone/stone_PNG13622.png'},
  {name: 'paper',uri: 'https://www.stickpng.com/assets/images/5887c26cbc2fc2ef3a186046.png'},
  {name: 'scissors',uri: 'http://pluspng.com/img-png/png-hairdressing-scissors-beauty-salon-scissors-clipart-4704.png'}];
const App=()=>{
  const [gamePrompt, setGamePrompt] = useState('Chose your weapon!');
  const [userChoice, setUserChoice] = useState({});
  const [computerChoice, setComputerChoice] = useState({});
  const onPress = (playerChoice) => {
    const [result, compChoice] = getRoundOutcome(playerChoice);
    const newUserChoice = choices.find(choice => choice.name === playerChoice);
    const newComputerChoice = choices.find(choice => choice.name === compChoice);
    setGamePrompt(result);
    setUserChoice(newUserChoice);
    setComputerChoice(newComputerChoice);
  };
  const randomComputerChoice = () => choices[Math.floor(Math.random() * choices.length)];
  const getRoundOutcome = (userChoice) => {
    const computerChoice = randomComputerChoice().name;
    let result;
    if (userChoice === 'rock')
      result = computerChoice === 'scissors' ? 'Victory!' : 'Defeat!';
    if (userChoice === 'paper')
      result = computerChoice === 'rock' ? 'Victory!' : 'Defeat!';
    if (userChoice === 'scissors')
      result = computerChoice === 'paper' ? 'Victory!' : 'Defeat!';
    if (userChoice === computerChoice) result = 'Tie game!';
    return [result, computerChoice];
  };
  const getResultColor = () => {
    if (gamePrompt === 'Victory!') return 'green';
    if (gamePrompt === 'Defeat!') return 'red';
    return null;
  };
  const ChoiceCard = ({ player, choice: { uri, name }}) => {
    const title = name && name.charAt(0).toUpperCase() + name.slice(1);
    return (
      <View style={{ flex: 1,alignItems: 'center',}}>
        <Text style={{ fontSize: 25, color: '#250902', fontWeight: 'bold' }}>
          {player}
        </Text>
        <Image source={{ uri }} resizeMode="contain"style={{ width: 150, height: 150, padding: 10 }}/>
        <Text style={{ fontSize: 30, color: '#250902' }}>{title}</Text>
      </View>
    );
  };
  const Button = ({ name }) => {
    const title = name && name.charAt(0).toUpperCase() + name.slice(1);
    return (
      <TouchableOpacity
        style={{width: 200,margin: 10,height: 50,borderRadius: 10,alignItems: 'center',justifyContent: 'center',backgroundColor: '#640D14',
        }}
        onPress={() => onPress(name)} // Access name directly from destructured argument
      >
        <Text style={{ fontSize: 25, color: 'white', fontWeight: 'bold' }}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={{flex: 1,alignItems: 'center',justifyContent: 'center',backgroundColor: '#e9ebee'}}>
      <Text style={{fontWeight:'bold', fontSize: 30}}>Rock Paper Scissors</Text>
      <Text style={{ fontSize: 35, color: getResultColor() }}>{gamePrompt}</Text>
      <View style={{margin: 10,borderWidth: 2,paddingTop: 60,shadowRadius: 5,paddingBottom: 100,borderColor: 'grey',shadowOpacity: 0.90,
          flexDirection: 'row',alignItems: 'center',backgroundColor: 'white',justifyContent: 'space-around',shadowColor: 'rgba(0,0,0,0.2)',
          shadowOffset: { height: 5, width: 5 },}}>
        <ChoiceCard player="Player"choice={userChoice}/>
        <Text style={{ color: '#250902' }}>vs</Text>
        <ChoiceCard player="Computer"choice={computerChoice}/>
      </View>{choices.map((choice) => (
      <Button key={choice.name} name={choice.name} /> // No props passed, access name from loop variable
    ))}
    </View>
  );
};
export default App;