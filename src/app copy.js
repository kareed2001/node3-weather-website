//core modules:
const path = require('path')

//npm modules
const express = require('express');

console.log(__dirname); // current path from wrapper function - to get to public use path core module
console.log(__filename);    // current file
console.log(path.join(__dirname, '../public'))

const app = express();  // create app by call express function

const publicDir = path.join(__dirname, '../public');


app.use(express.static(publicDir) )// can customize server



// goal: we own app.com and we want to get to app.com/help and app.com/about

// get takes reqeust and response parms
app.get('', (req, res) => {
    res.send('no longer need once we switch to app.use')    //sends something back to requstor - can go to localhost:3000 in browser to see

});

// app.get('/help', (req, res) => { // send to help
//      res.send([{
//             name: 'help',
//             content: 'done'
//         },
//         {
//             name: 'about',
//             content: 'Nice'
//         }
//     ])
// })

// app.get('/about', (req, res) => { // send to about
//     res.send({
//         name: 'Weather',
//         content: 'Nice'
//     });
// })

app.get('/weather', (req, res) => { // send to weather
    res.send({
        location: 'Here',
        forecast: 'Nice'
    });
})

// start server - keeps running until we stop it
app.listen(3000, () => {     // usually dev port, 80 is http port - more later
    console.log('Server is up on port 3000');
})   