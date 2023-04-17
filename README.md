# cse135
Names of all members: Ruoqian Huang, Yilong Xiong, Yinong Xu

Password for user "grader" on your Apache server: 


Link to site: https://cse135.cloud/

Username/password info for logging into the site:
- username: Emily    or    file3.4
- Password: Spring2023

Deployment setup description: 


Summary of changes to HTML file in DevTools after compression: 
After compression, the response header contains 'Content-Encoding: gzip'.

Part 3 Step 6: 
1. Install the mod_security module
2. Enable it by running sudo a2enmod security2
3. Add the following lines to /etc/apache2/apache2.conf:\
   ServerTokens Full\
   SecServerSignature “CSE135 Server”
4. restart Apache to apply the changes