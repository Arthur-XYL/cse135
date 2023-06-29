# cse135

IMPORTANT: please let Shubham Kumar to grade the work, I have put his public key under the grader's account so he is the one that can login.
IP address: 24.199.124.95
Grader username: grader
Password for user "grader" on your Apache server: 123456

Names of all members: Ruoqian Huang, Yilong Xiong, Yinong Xu

Link to site: https://cse135.cloud/

Username/password info for logging into the site:

- username: Emily or file3.4
- Password: Spring2023

Deployment setup description:

1. Go to github -> action
2. set up a workflow myself
3. Deploy vs sftp and put user's information
4. create a github secret and put the user's private key there
5. commit

Summary of changes to HTML file in DevTools after compression:
After compression, the response header contains 'Content-Encoding: gzip'. The size value under the network tab becomes lower and the time becomes faster.

Step 6:

1. Install the mod_security module
2. Enable it by running sudo a2enmod security2
3. Add the following lines to /etc/apache2/apache2.conf:\
   ServerTokens Full\
   SecServerSignature “CSE135 Server”
4. restart Apache to apply the changes

Dashboard: (HW4 part3)
For all charts, if you right click, there is options to download the data in four different formats: PDF, SVG, CSV, or XLS. You could also view data table or print chart.
Session Time Grid: 
From this grid, we want to show the time page being open and closed. We think it is important because we could know what time people have looked at our website and how long they have stayed on. It makes sense to use a grid because it gives readability for reading specific information about time and provides efficiency for designing report.
Load Time Grid:
From this grid, we want to show load time for each visit, so we used the grid where data is ordered by the visits. In this way, it improves readability to see specific load time each visit takes and provides efficiency for designing report.
Mouse Movement Chart:
It is important to know how often users move their mouse, so we used line chart to show such information. Data is organized by different session id, which represents different devices. The highest and lowest mouse movement for single visit is showed on the line chart.
Screen Dimension Chart:
We think it is important to know screen dimension of our website's visitors. We chose pie chart because many visits would happen on same devices or on different devices with same dimensions. By using pie chart, it is simple and easy to tell how many percentage of certain screen dimensions are used and to compare between different sizes.

Report: (HW4 part4)
Load Time distribution Report:
The question we want to talk about is "What is the distribution of load times experienced by users?"
The load time distribution analysis aims to provide insights into the distribution of load times experienced by users.
This metric is important because when pages load slowly, user attention wanders, and users perceive the task as broken. As developers, we can identify performance issues of the website and make decisions to improve based on this information.
Our grid on the left shows the exact total time experienced by the users. We used grid to imrpove readability for specific data. With this information, we are able to calculate the frequency when each load time appears. We used a bar chart to visualize this data on the right because bar chart is simple to read and provides comparative analysis. It shows the relationship between load time and the frequency. From the chart, we can clearly see the frequency of each load time. For example, the users experience a load time of 0.1 ms 47 times, 0.2 ms for 28 times, 0.3 ms for 12 times, and so on. We can see a general trend that the frequency decreases when load time increases, which shows that our website has a relatively good performance that the load time is short most of the times.

Session Time Distribution Report:
The question we want to talk about is "What is the length of time users spend interacting with the system?"
The session time distribution analysis aims to provide insights into the duration of user sessions and to help to understand how users engage with our website. 
This metric is important because it demonstrates the user engagement by showing how long users typically stay on our website. As developers, we can evaluate the effectiveness of our content, feaures, and user experience overall. For example, longer session time may imply that the content is interesting and attractive to the user.
Our grid on the left shows the exact time of page entries and page exits, and the session time is just the difference between page entries and page exits. We used grid because it is simple to read specific information. We used scatter plot to visualize this data on the right beacuse scatter plot helps to observe the spread and relationship between session time and the frequency. We can understand the distributional characteristics of session time by observing the concentration and spread of data points. From the chart, we can see the data points appear most frequently around 0 ms (More accurately by looking at the grid, less than 20 ms). This is representative of the user activity because this website is just a analytic dashboard and we usually just log in to check whether the dashboard display correctly instead of engaing with it. Few outliers exist because sometimes we did not close the website right away.