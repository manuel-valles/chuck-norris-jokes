// Click Event Listener
document.getElementById('get-jokes').addEventListener('click', getJokes);

function getJokes(e){
  // Get the number of jokes
  const number = document.querySelector('input[type="number"]').value;

  // Validation - Minimum to 1 (includes 'No empty')
  if(number >= 1){
    // Instantiate a XML object
    const xhr = new XMLHttpRequest();
    // Get request from the API with asynchronous to true
    xhr.open('GET', `http://api.icndb.com/jokes/random/${number}`, true);

    // Onload method
    xhr.onload = function(){
      // Validate request
      if(this.status === 200){
        // Parse the response
        const response = JSON.parse(this.responseText);
        // Initialize the output
        let output = '';
        // Validate response from the API
        if(response.type === 'success'){
          response.value.forEach(function(joke){
            output += `<li>${joke.joke}</li>`;
          });
        } else{
          output += `<li>Something went wrong</li>`;
        }
    
        document.getElementById('jokes').innerHTML = output;
      }
    }
    // Send needed
    xhr.send();

  } else{
    // Clear output
    document.getElementById('jokes').innerHTML = '';
    // Create div
    const div = document.createElement('div');
    // Add class
    div.className = 'alert';
    // Add text
    div.appendChild(document.createTextNode('Please enter the number of jokes'));
    // Get parent of div
    const container =  document.querySelector('.container');
    // Get jokes
    const jokes = document.querySelector('#jokes');
    // Insert message
    container.insertBefore(div, jokes);

    // Timeout after 3 secs
    setTimeout(function(){
      document.querySelector('.alert').remove();
    }, 2000);
  }
  
  e.preventDefault();
}