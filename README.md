# cse135

IMPORTANT: please let Shubham Kumar to grade the work, I have put his public key under the grader's account so he is the one that can login.
IP address: 24.199.124.95
Grader username: grader

Names of all members: Ruoqian Huang, Yilong Xiong, Yinong Xu

Password for user "grader" on your Apache server: 123456

Link to site: https://cse135.cloud/

Username/password info for logging into the site:

- username: Emily or file3.4
- Password: Spring2023

Deployment setup description:

Summary of changes to HTML file in DevTools after compression:
After compression, the response header contains 'Content-Encoding: gzip'.

Part 2 Deploy from github

1. Go to github -> action
2. set up a workflow myself
3. Deploy vs sftp and put user's information
4. create a github secret and put the user's private key there
5. commit

Part 3
Step 5: The size value under the network tab becomes lower.
Step 6:

1. Install the mod_security module
2. Enable it by running sudo a2enmod security2
3. Add the following lines to /etc/apache2/apache2.conf:\
   ServerTokens Full\
   SecServerSignature “CSE135 Server”
4. restart Apache to apply the changes
