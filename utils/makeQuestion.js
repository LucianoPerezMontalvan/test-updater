import inquirer from "inquirer"
const makeQuestion = async ({type, name, message, choices}) => {
  try {
    let question = {}
    if(type === 'list'){
      question = {
        type,
        name,
        message,
        choices
      }
    } else {
      question = {
        type,
        name,
        message
      }
    }
    const value = await inquirer.prompt(question)
    return value[name]
  } catch (error) {
    console.log(error);
  }
}

export default makeQuestion