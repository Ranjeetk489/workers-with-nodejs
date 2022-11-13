# workers-with-nodejs
A repo containing express server in nodejs utilizing web workers to offload heavy work from main thread. The main purpose behind this is that javascript is a single threaded language. Due to that
let's say one user makes a request to backend and that response is derived from some heavy calculations, till that heavy request is processed our backend will not be able to serve any other request.
Even if the second request just returns simple "Hello world" text as response. We can use Web workers to address situation as such. We offload the heavy compuation 
on web worker and since the computation is happening on web worker on seperate thread javascript's main thread can attend to other requests and when the result from worker arrives then the response is send
as result to the first request.

In this repo, I have 3 servers. In first i have no webworker and if you make a request to "blocking" endpoint and after that try making request to "nonBlocking" endpoint. You'll see that "nonBlocking" request which only returns a simple text resolves only after the first request to "blocking" point resolves.
In second I use 1 web worker to offload the expensive calculation and with that my main thread is able to respond to other incoming requests. In third server i'm setting up workers on multiple threads which fastens the execution of heavy workload.



