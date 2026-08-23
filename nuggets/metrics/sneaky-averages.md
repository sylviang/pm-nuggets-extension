# Sneaky Averages

_Last updated: 2025-12-16_

Averages can be dangerously misleading. The mean (arithmetic average) is easily skewed by outliers, hiding critical patterns and variations in your data. Relying solely on averages often obscures the reality of user behavior, performance metrics, and business outcomes.

When a few power users drive unusually high engagement, the mean masks that most users barely engage at all. When average session time is 5 minutes but the median is 30 seconds, you have a fundamentally different product problem than the "average" suggests.

**Why averages mislead PMs:**
- Outliers distort the mean, making it unrepresentative of typical values
- Average hides bimodal distributions where users fall into distinct segments
- Revenue, engagement, and usage metrics are often heavily skewed
- Decisions based on averages may serve no actual user segment

**Better approaches:**
- Use median for skewed distributions (user engagement, revenue, session times)
- Look at percentiles (P50, P90, P95) to understand distribution shape
- Segment users and analyze each cohort separately
- Always visualize distributions before summarizing with a single number
- Report both mean and median alongside standard deviation

**Example:** If average revenue per user is $100 but median is $5, you likely have a small number of whales subsidizing freeloaders—a very different product strategy than if all users contributed equally.

📘 [How to Lie with Statistics by Darrell Huff](https://www.amazon.com/How-Lie-Statistics-Darrell-Huff/dp/0393310728)    
🔗 [Mean vs Median for Product Managers](https://gopractice.io/data/arithmetic-mean-and-median-for-product-managers/)
