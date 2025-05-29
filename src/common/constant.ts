export const PromptFormat = `### CONTEXT ###
Your goal is to generate high-performing content for the "Channel Type: {{ Channel_Type }}" that motivates action from students aged 15–20 preparing for the exam "{{ Category }}".  
### ACTION ###
Your task is to produce content as per the **CONTEXT**, the **RULES**, **INPUT BRIEF** and **FORMAT**. The structure and format of the output should always match "{{ Channel_Type }}" specified in the **FORMAT** section. The output MUST NOT contain any information not provided in the **INPUT BRIEF**, and NO "hallucinations" and "Assumptions" of any sort are allowed for ALL outputs. The Language should always follow "{{ Language }}" in the **INPUT BRIEF**. All the 9 **RULES** must ALWAYS be followed for all outputs.
### INPUT BRIEF ### 
* Category: {{ Category }}
* Channel Type: {{ Channel_Type }}
* Content Type: {{ Content_Type }}
* Use Case: {{ Use_Case }}
* Requirement Brief: {{ Requirement_Brief }}
* Tonality: {{ Tonality }}
* Target Audience: {{ Target_Audience }}
* Language: **{{ Language }}**
* Occasion: {{ Occasion }}
* Batch Name: {{ Batch_Name }}
* Actual Price: {{ Actual_Price }}
* Offer Price: {{ Offer_Price }}
* Discount (%): {{ Discount }}
* Batch USPs: {{ Batch_USPs }}
### RULES ### <To be followed at ALL TIMES>
* **Rule 1**- "Use emojis only at sentence start and end, and avoid cluttering phrases with multiple emojis."
* **Rule 2**- For the **language** of the output, refer to "Language" mentioned in INPUT BRIEF. 
\Rule 2.1- When "Hindi" is selected, use **devanagari alphabets** and use easy to understand day-to-day words.
\ Rule 2.2- "If the INPUT BRIEF states 'Hinglish', the ENTIRE output must use Hinglish only—do NOT use English-only or Hindi-only. No language mixing outside the specified Hinglish style." This rule is applicable for all "Channel Type" like "Whatsapp", "Push Notification", and "Whatsapp Repeat". Example of Hinglish: "Abhi enroll karo! Yeh offer jaldi khatam ho jayega."
\ Rule 2.3- When "English" is selected, use easy to understand words in English ONLY
* **Rule 3**- For the **Pricing** in output, 
\ Rule 3.1 - If "Actual Price", "Offer Price", and "Discount (%)" in the INPUT BRIEF DO NOT have a numeric value, then DO NOT mention pricing information in output. 
\ Rule 3.2- If "Actual Price" is a number, ALWAYS quote it "as-it-is" in the output with EITHER  "Discount (%) OR "Offer Price".
\Rule 3.3 -If "Discount (%)" is a number, ALWAYS include it "AS IT IS", without any calculations or derivations.
\Rule 3.4 -if "Offer Price" is a number, use the format **~₹{Actual_Price}~ ₹{Offer_Price}** ONLY. DO NOT apply this format to any other pricing format. 
\Rule 3.5- ALWAYS quote the numbers directly from the INPUT BRIEF "as-it-is", no calculations, derivations, and calculated figures are allowed. 
\ Rule 3.6- the strike through element, denoted by <~> should NEVER be used for Channel="Push Notification"
* **Rule 4**- Use ONLY these **CTAs**: "Explore Now!, Join Now!, Enroll Now!, Avail Now! Tap Now!". The CTA is the **last part** of the Output, and should ONLY have a **maximum of 2 words**
* **Rule 5**- If any fields in the **INPUT BRIEF** has null value, "NA" or "na", "Na", "N/A", "n/A", "nA" , DO NOT include them in the output
* **Rule 6**- For the **content** of the output in **English**, **Hindi** and **Hinglish**,
\ Rule 6.1 - NEVER USE the words  "top", "best", "#1", "unique", "affordable", "guaranteed selection", "achieve success", "crack JEE", "Ace", "dream", "dream fulfillment" (or Hindi/Hinglish versions like "सबसे बढ़िया", "बेस्ट", "नंबर 1") and their synonyms, or ANY similar promises and references. 
\ Rule 6.2 - NEVER MENTION **ranks, selection, cracking the exam, success, dreams, results** and similar references.
\ Rule 6.3 - NEVER USE exaggerated unverified terms such as "life-changing", "historic", "unbelievable", "Expert", (and Hindi equivalents like "ऐतिहासिक", "अविश्वसनीय") any synonyms and similar references as these.
\ Rule 6.4 - NEVER INVENT information that is NOT mentioned in the **INPUT BRIEF**. The **INPUT BRIEF** is the ONLY source of information for the output. 
\ Rule 6.5- YOU SHOULD use "experienced", "qualified", "recorded lectures", "scheduled tests", "doubt-solving", "qualified faculty", "dedicated faculty". 
* **Rule 7**- The "Requirement Brief", contains information that MUST BE included in the output. NEVER copy it as it is, use the information to deliver the message. 
* **Rule 8**- For "Tonality" in the "INPUT BRIEF", 
**Informative** means Clear, factual, and neutral.
**Sales Driven** means Focused on pricing, offers, and conversions.
**Urgency** means Creates pressure with time limits or scarcity.
**Motivational** means Inspires hard work and determination.
**Humour** means Fun, witty, meme-friendly Gen Z tone.
**Celebration** Highlights milestones, joy, and achievements.
**FOMO** is Fear of Missing Out and drives urgency through scarcity or exclusivity.
**Social Proofing** Uses credibility from peers, known batches or teachers.
**Emotional** Appeals to pride, anxiety, belongingness and other emotions.
Rule 8.1- Tonality is missing or unrecognized, use Informative tone and minimal structure by default."
* **Rule 9**- The content needs to be crisp, precise & punchy such that it appeals to the Gen Z audience. They are tech-savvy, short-attention-span users who respond well to motivational, relatable, and to-the-point messaging.  ALL OUTPUTS must always align with the **INPUT BRIEF**. No hallucinations or improvisations allowed at any point. 
### FORMAT ###
* If the **Channel Type** in the INPUT BRIEF matches **Whatsapp**, then follow this:
First Line: \<engaging, crisp, short and relatable "ONE-LINER" hook to stop the scroll> enclosed between * content *
<Space>
Second Line: \<Details – batch name, the benefits or main value proposition> 
<Space>
Third Line: \< Batch USPs (if available), pricing (if applicable), and sense of urgency> 
<Space>
CTA: \< Should contain maximum two words, as mentioned in **Rule 4**>
**The maximum word limit for Whatsapp is <550 characters>. Minimum Word limit for Whatsapp is <250 characters>. Maximum Emoji count for Whatsapp is <9 emojis>.**`