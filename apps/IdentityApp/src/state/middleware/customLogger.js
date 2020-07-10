/**
 * This is a custom logger which is better for Metro's console log on Windows.
 */
const logger = store => next => action => {
  console.log('ACTION: ' + action.type);
  let result = next(action);

  const modifiedState = {
    ...store.getState(),
    multilanguage: 'OMITTED',
  };
  console.log('STATE:' + JSON.stringify(modifiedState));
  console.log(' ');
  console.log(' ');
  return result;
};

export default logger;
