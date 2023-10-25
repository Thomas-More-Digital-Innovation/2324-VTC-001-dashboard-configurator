# Meeting Report - October 25, 2023
## Content
The last few weeks I have been working on a dashboard demo, where I explored different graph libraries and visualisation methods. I summarized the usecases, positives and negatives for each library and the possible use cases. I made 3 non-timebased and 3 timebased visualisations, using demo data. As agreed on, I presented Nele & Steff this dashboard demo today. Claudia, the person who configures the dashboards, also joined in.

We discussed the 3 different libraries and their possible usage in a dashboard. The first thing they mentioned was that the moving graphs (transforming piechart, racing bar chart) were quite busy. This would not be suited for the dashboard they have in mind, so I can abandon the research for animated/moving graphs. As for the libraries, they were very fond of Chart.js & Apache Echarts. I pointed out that my preference also consists of these two, since the d3.js library is a little over-the-top for the use case. In general, everybody was pleasantly impressed.

After the demo, we discussed the further course of business. I am to arrange a physical meeting with Steff, which will take place in Leuven, where we can go over the source code of the created dashboards. I asked this so I can take a look at how data from .csv-files is read into the actual visualisations. The reason for this is that I'm struggling a bit with achieving this. I currently have a functioning csv-reader function and working visualisations, but I haven't managed to combine these to. This mostlikely has something to do with the (a)synchronous execution of the functions.

After the future meeting with Steff, I will arrange a meeting with Claudia as well. She is responsible for the construction of the dashboards, which is done with an .xml-file. I asked her to go over her whole workflow, so I can gain a better understanding of how she currently operates. Based on this, I will try to make the usage of the new dashboard as identical as possible.

Nele mentioned Koen Van Eekhout, a known figure in the datavis-world. She'll try and contact him, asking if he would share his opninion on the potential visualisations we're intending on using. Regarding the app that is currently being developed by an external firm: I didn't yet receive a login for testing. Claudia told me she would contact the firm and forward them to me.

In anticipation of the mentioned meetings, which will likely take place somewhere in the coming two weeks, I will try and fix the .csv reading and create a file in which I display all the possible graph types and options (using the echarts library). Afterwards, we'll go over these and select the ones that should be configured in the source code. Claudia will send me an example xml-file and manual she uses to construct the dashboard, as well as the lists of questions for already existing dashboards.

## Summarization
- No moving visualisations
- Interactivity only when added value (less is more)
- Make a list of all possible graph types
- Arrange meetings with Steff (source code & data choice) and Claudia (workflow dashboard config)
- To receive: manual, example xml-file, questions list & login for new app
