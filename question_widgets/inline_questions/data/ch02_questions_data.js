//optionstyletypes ---- "st-upper-alpha", "st-lower-alpha", "st-upper-roman", "st-lower-roman", "st-decimal", "st-none"
const questions_data = {
  sharedProperties: {
    maxWidth: "960px", //"100%", "90%", "760px", "1024px"
    alignment: "center", //"center", "left"
    pageStateIdentifier:"Id1737626335358",//statedata identifier to store data in localstorage.
    saveStateData:"yes",//Flag to allow save state data or not, values are "yes", "no"
  },
  question_groups: {
    group4: {
      id: "group4",
      type: "dropdown",
      placeholder_id: "group4_placeholder",
      commonDropdownOptions:[],
      items: [
        { 
          headerImage:{
            src:"data/media/images/fig2-practicalapplication-1.jpg",
            alt:"Chest X-ray displaying the anatomical positions of the heart and lungs for medical analysis and evaluation.",
            figCaption: "FIGURE A",
            align:"left",//center
            widthPerc:"70"//"10","20","30","40","50","60","70","80","90","100"
          },
          dropdownHtml:`<span>This is a/an #dropdown1# view. The heart lies #dropdown2# to the vertebrae.</span>`,
          dropdowns:{
            dropdown1:{values:["axial","coronal","sagittal"],correctValue: "sagittal",dropdownlabel:"Select the type of view", useCommonOptions:"false"},
            dropdown2:{values:["anterior","posterior", "dorsal"],correctValue: "anterior",dropdownlabel:"Select the position of the heart", useCommonOptions:"false"}
          },
          dropdownPlacement:"inline",//newline
          correctFeedback: `Your answer is correct.`,
          partialFeedback: `You have one or more incorrect answers.`,
          incorrectFeedback: `Your answer is incorrect.`
        },
        { 
          headerImage:{
            src:"data/media/images/fig2-practicalapplication-2.jpg",
            alt:"Diagram illustrating the human lungs and heart, highlighting their anatomical structure and interconnection.",
            figCaption: "FIGURE B",
            align:"left",//center
            widthPerc:"70"//"10","20","30","40","50","60","70","80","90","100"
          },
          dropdownHtml:`<span>This is a/an #dropdown1# view. It is a/an #dropdown2# image.</span>`,
          dropdowns:{
            dropdown1:{values:["axial","coronal","sagittal"],correctValue: "axial",dropdownlabel:"Select the type of view", useCommonOptions:"false"},
            dropdown2:{values:["traditional x-ray","CT"],correctValue: "CT",dropdownlabel:"Select the type of image", useCommonOptions:"false"}
          },
          dropdownPlacement:"inline",//newline
          correctFeedback: `Your answer is correct.`,
          partialFeedback: `You have one or more incorrect answers.`,
          incorrectFeedback: `Your answer is incorrect.`
        },
        {
          headerImage:{
            src:"data/media/images/fig2-practicalapplication-3.jpg",
            alt:"Chest X-ray displaying the lungs and heart, highlighting their structure and any potential abnormalities.",
            figCaption: "FIGURE C",
            align:"left",//center
            widthPerc:"70"//"10","20","30","40","50","60","70","80","90","100"
          },
          dropdownHtml:`<span>This is a/an #dropdown1# view. It is a/an #dropdown2# image.</span>`,
          dropdowns:{
            dropdown1:{values:["axial","coronal","sagittal"],correctValue: "coronal",dropdownlabel:"Select the type of view", useCommonOptions:"false"},
            dropdown2:{values:["transverse","lateral","anterior/posterior"],correctValue: "anterior/posterior",dropdownlabel:"Select the type of image", useCommonOptions:"false"}
          },
          dropdownPlacement:"inline",//newline
          correctFeedback: `Your answer is correct.`,
          partialFeedback: `You have one or more incorrect answers.`,
          incorrectFeedback: `Your answer is incorrect.`
        }
      ],
      optionStyleType: "st-decimal",
      itemSeperator: "true",
    },
    group5: {
      id: "group5",
      type: "dropdown",
      placeholder_id: "group5_placeholder",
      commonDropdownOptions:[
        "Inspection of abdominal organs (lapar/o means abdomen) and removal of diseased tissue",
        "Removal of a diseased or injured portion of the brain",
        "Emergency effort to remove foreign material from the windpipe",
        "Inspection and repair of torn cartilage in the knee",
        "Removal of a squamous cell † carcinoma in the voice box",
        "Relief of symptoms from a bulging intervertebral disc",
        "Open heart surgery, or removal of lung tissue",
        "Inspection of lymph nodes * in the region between the lungs"
      ],
      items: [
        {
          headerImage:{},
          dropdownHtml:`<span>Craniotomy #dropdown1#</span>`,
          dropdowns:{
            dropdown1:{values:[],correctValue: "Removal of a diseased or injured portion of the brain",dropdownlabel:"Select the Procedures", useCommonOptions:"true"},
          },
          dropdownPlacement:"newline",//inline
        },
        {
          headerImage:{},
          dropdownHtml:`<span>Thoracotomy #dropdown1#</span>`,
          dropdowns:{
            dropdown1:{values:[],correctValue: "Open heart surgery, or removal of lung tissue",dropdownlabel:"Select the Procedures", useCommonOptions:"true"},
          },
          dropdownPlacement:"newline",//inline
        },
        {
          headerImage:{},
          dropdownHtml:`<span>Discectomy #dropdown1#</span>`,
          dropdowns:{
            dropdown1:{values:[],correctValue: "Relief of symptoms from a bulging intervertebral disc",dropdownlabel:"Select the Procedures", useCommonOptions:"true"},
          },
          dropdownPlacement:"newline",//inline
        },
        {
          headerImage:{},
          dropdownHtml:`<span>Mediastinoscopy #dropdown1#</span>`,
          dropdowns:{
            dropdown1:{values:[],correctValue: "Inspection of lymph nodes * in the region between the lungs",dropdownlabel:"Select the Procedures", useCommonOptions:"true"},
          },
          dropdownPlacement:"newline",//inline
        },
        {
          headerImage:{},
          dropdownHtml:`<span>Tracheotomy #dropdown1#</span>`,
          dropdowns:{
            dropdown1:{values:[],correctValue: "Emergency effort to remove foreign material from the windpipe",dropdownlabel:"Select the Procedures", useCommonOptions:"true"},
          },
          dropdownPlacement:"newline",//inline
        },
        {
          headerImage:{},
          dropdownHtml:`<span>Laryngectomy #dropdown1#</span>`,
          dropdowns:{
            dropdown1:{values:[],correctValue: "Removal of a squamous cell † carcinoma in the voice box",dropdownlabel:"Select the Procedures", useCommonOptions:"true"},
          },
          dropdownPlacement:"newline",//inline
        },
        {
          headerImage:{},
          dropdownHtml:`<span>Arthroscopy #dropdown1#</span>`,
          dropdowns:{
            dropdown1:{values:[],correctValue: "Inspection and repair of torn cartilage in the knee",dropdownlabel:"Select the Procedures", useCommonOptions:"true"},
          },
          dropdownPlacement:"newline",//inline
        },
        {
          headerImage:{},
          dropdownHtml:`<span>Laparoscopy (peritoneoscopy) #dropdown1#</span>`,
          dropdowns:{
            dropdown1:{values:[],correctValue: "Inspection of abdominal organs (lapar/o means abdomen) and removal of diseased tissue",dropdownlabel:"Select the Procedures", useCommonOptions:"true"},
          },
          dropdownPlacement:"newline",//inline
        }
      ],
      itemsInstruction:`<p>* Lymph nodes are collections of tissue containing white blood cells called lymphocytes.</p>
                        <p>† A squamous cell is a type of epithelial cell.</p>`,
      correctFeedback: `All of your answers are correct.`,
      partialFeedback: `You have one or more incorrect answers.`,
      incorrectFeedback: `Your answers are incorrect.`,
      optionStyleType: "st-decimal",
      itemSeperator: "false",
    },
    group6:{
      id: "group6",
      type: "dropdown",
      placeholder_id: "group6_placeholder",
      commonDropdownOptions:[
        "oncologist",
        "ophthalmologist",
        "cardiologist",
        "urologist",
        "nephrologist",
        "gastroenterologist",
        "hematologist",
        "neurologist",
        "gynecologist",
        "psychiatrist"
      ],
      items: [
        {
          dropdownTitle:`<p>Complete the following sentences.</p>`,
          headerImage:{},
          dropdownHtml:`<span>heart attack #dropdown1#</span>`,
          dropdowns:{
            dropdown1:{values:[],correctValue: "cardiologist",dropdownlabel:"Select the physician", useCommonOptions:"true"},
          },
          dropdownPlacement:"inline",//inline
        },
        {
          dropdownTitle:``,
          headerImage:{},
          dropdownHtml:`<span>ovarian cysts #dropdown1#</span>`,
          dropdowns:{
            dropdown1:{values:[],correctValue: "gynecologist",dropdownlabel:"Select the physician", useCommonOptions:"true"},
          },
          dropdownPlacement:"inline",//inline
        },
        {
          headerImage:{},
          dropdownHtml:`<span>bipolar (manic-depressive) disorder #dropdown1#</span>`,
          dropdowns:{
            dropdown1:{values:[],correctValue: "psychiatrist",dropdownlabel:"Select the physician", useCommonOptions:"true"},
          },
          dropdownPlacement:"inline",//newline
        },
        {
          headerImage:{},
          dropdownHtml:`<span>breast adenocarcinoma #dropdown1#</span>`,
          dropdowns:{
            dropdown1:{values:[],correctValue: "oncologist",dropdownlabel:"Select the physician", useCommonOptions:"true"},
          },
          dropdownPlacement:"inline",//inline
        },
        {
          dropdownTitle:`<p>Complete the following dropdowns.</p>`,
          headerImage:{},
          dropdownHtml:`<span>iron deficiency anemia #dropdown1#</span>`,
          dropdowns:{
            dropdown1:{values:[],correctValue: "hematologist",dropdownlabel:"Select the physician", useCommonOptions:"true"},
          },
          dropdownPlacement:"inline",//inline
        },
        {
          headerImage:{},
          dropdownHtml:`<span>retinopathy #dropdown1#</span>`,
          dropdowns:{
            dropdown1:{values:[],correctValue: "ophthalmologist",dropdownlabel:"Select the physician", useCommonOptions:"true"},
          },
          dropdownPlacement:"inline",//inline
        },
        {
          headerImage:{},
          dropdownHtml:`<span>cerebrovascular accident (stroke) #dropdown1#</span>`,
          dropdowns:{
            dropdown1:{values:[],correctValue: "neurologist",dropdownlabel:"Select the physician", useCommonOptions:"true"},
          },
          dropdownPlacement:"inline",//inline
        },
        {
          headerImage:{},
          dropdownHtml:`<span>renal failure #dropdown1#</span>`,
          dropdowns:{
            dropdown1:{values:[],correctValue: "nephrologist",dropdownlabel:"Select the physician", useCommonOptions:"true"},
          },
          dropdownPlacement:"inline",//inline
        },
        {
          headerImage:{},
          dropdownHtml:`<span>inflammatory bowel disease #dropdown1#</span>`,
          dropdowns:{
            dropdown1:{values:[],correctValue: "gastroenterologist",dropdownlabel:"Select the physician", useCommonOptions:"true"},
          },
          dropdownPlacement:"inline",//inline
        },
        {
          headerImage:{},
          dropdownHtml:`<span>prostatic adenocarcinoma #dropdown1#</span>`,
          dropdowns:{
            dropdown1:{values:[],correctValue: "urologist",dropdownlabel:"Select the physician", useCommonOptions:"true"},
          },
          dropdownPlacement:"inline",//inline
        },
      ],
      correctFeedback: `All of your answers are correct.`,
      incorrectFeedback: `Your answers are incorrect.`,
      partialFeedback: `You have one or more incorrect answers.`,
      optionStyleType: "st-decimal",
      itemSeperator: "false",
    },
    group7: {
      id: "group7",
      type: "cloze", //Fill-in-the-Blank
      placeholder_id: "group7_placeholder",
      items: [
        {
          headerImage:{
            src:"data/media/images/fig2-practicalapplication-1.jpg",
            alt:"Chest X-ray displaying the anatomical positions of the heart and lungs for medical analysis and evaluation.",
            figCaption: "FIGURE A",
            align:"center",//center
            widthPerc:""//"10","20","30","40","50","60","70","80","90","100"
          },
          clozeHtml:`<span>Word beginnings are called #cloze1#.</span>`,
          clozes:{
            cloze1:{correctValue: "prefixes", clozelabel:"fill in the blank"},
          },
          clozePlacement:"inline",//newline
        },
        {
          clozeHtml:`<span>Word endings are called #cloze1#.</span>`,
          clozes:{
            cloze1:{correctValue: "suffixes", clozelabel:"fill in the blank"},
          },
          clozePlacement:"inline",//newline
        },
        {
          clozeHtml:`<span>The foundation of a word is known as the #cloze1#.</span>`,
          clozes:{
            cloze1:{correctValue: "root", clozelabel:"fill in the blank"},
          },
          clozePlacement:"inline",//newline
        },
        {
          clozeHtml:`<span>A letter linking a suffix and a root, or linking two roots, in a term is the #cloze1#.</span>`,
          clozes:{
            cloze1:{correctValue: "combining vowel", clozelabel:"fill in the blank"},
          },
          clozePlacement:"inline",//newline
        },
        {
          clozeHtml:`<span>The combination of a root and a combining vowel i.e. #cloze1# is known as the #cloze2#.</span>`,
          clozes:{
            cloze1:{correctValue: "combining form", clozelabel:"fill in the blank"},
            cloze2:{correctValue: "combining root", clozelabel:"fill in the blank"},
          },
          clozePlacement:"inline",//newline
        },
      ],
      correctFeedback: `All of your answers are correct.`,
      incorrectFeedback: `Your answers are incorrect.`,
      partialFeedback: `You have one or more incorrect answers.`,
      optionStyleType: "st-decimal",
      itemSeperator: "false",
    },
    group8: {
      id: "group8",
      type: "cloze", //Fill-in-the-Blank
      placeholder_id: "group8_placeholder",
      items: [
        {
          clozeTitle:`<p><strong>First cloze title</strong></p>`,
          headerImage:{},
          clozeHtml:`<span>study of the urinary tract: #cloze1# logy</span>`,
          clozes:{
            cloze1:{correctValue: "uro", clozelabel:"fill in the blank"},
          },
          clozePlacement:"inline",//newline
        },
        {
          clozeHtml:`<span>study of women and women’s diseases: #cloze1# logy</span>`,
          clozes:{
            cloze1:{correctValue: "gyneco", clozelabel:"fill in the blank"},
          },
          clozePlacement:"inline",//newline
        },
        {
          clozeHtml:`<span>study of blood: #cloze1# hematology</span>`,
          clozes:{
            cloze1:{correctValue: "hemato", clozelabel:"fill in the blank"},
          },
          clozePlacement:"inline",//newline
        },
        {
          clozeHtml:`<span>study of tumors: #cloze1# logy</span>`,
          clozes:{
            cloze1:{correctValue: "onco", clozelabel:"fill in the blank"},
          },
          clozePlacement:"inline",//newline
        },
        {
          clozeTitle:`<p><strong>Second cloze title</strong></p>`,
          clozeHtml:`<span>study of the kidneys: #cloze1# logy</span>`,
          clozes:{
            cloze1:{correctValue: "nephro", clozelabel:"fill in the blank"}
          },
          clozePlacement:"inline",//newline
        },
        {
          clozeHtml:`<span>study of nerves: #cloze1# logy</span>`,
          clozes:{
            cloze1:{correctValue: "neuro", clozelabel:"fill in the blank"}
          },
          clozePlacement:"inline",//newline
        },
        {
          clozeHtml:`<span>treatment of children: #cloze1# iatrics</span>`,
          clozes:{
            cloze1:{correctValue: "ped", clozelabel:"fill in the blank"}
          },
          clozePlacement:"inline",//newline
        },
        {
          clozeHtml:`<span>study of x-rays in diagnostic imaging: #cloze1# logy</span>`,
          clozes:{
            cloze1:{correctValue: "radio", clozelabel:"fill in the blank"}
          },
          clozePlacement:"inline",//newline
        },
        {
          clozeHtml:`<span>study of the eyes: #cloze1# logy</span>`,
          clozes:{
            cloze1:{correctValue: "ophthalmo", clozelabel:"fill in the blank"}
          },
          clozePlacement:"inline",//newline
        },
        
        {
          clozeHtml:`<span>study of the stomach and intestines: #cloze1# logy</span>`,
          clozes:{
            cloze1:{correctValue: "gastroentero", clozelabel:"fill in the blank"}
          },
          clozePlacement:"inline",//newline
        },
        {
          clozeHtml:`<span>study of glands that secrete hormones: #cloze1# logy</span>`,
          clozes:{
            cloze1:{correctValue: "endocrino", clozelabel:"fill in the blank"}
          },
          clozePlacement:"inline",//newline
        },
        {
          clozeHtml:`<span>treatment of the mind: #cloze1# logy</span>`,
          clozes:{
            cloze1:{correctValue: "psych", clozelabel:"fill in the blank"}
          },
          clozePlacement:"inline",//newline
        },
        {
          clozeHtml:`<span>study of disease: #cloze1# logy</span>`,
          clozes:{
            cloze1:{correctValue: "patho", clozelabel:"fill in the blank"}
          },
          clozePlacement:"inline",//newline
        },
        {
          clozeHtml:`<span>study of the heart: #cloze1# logy</span>`,
          clozes:{
            cloze1:{correctValue: "cardio", clozelabel:"fill in the blank"}
          },
          clozePlacement:"inline",//newline
        },
      ],
      correctFeedback: `All of your answers are correct.`,
      incorrectFeedback: `Your answers are incorrect.`,
      partialFeedback: `You have one or more incorrect answers.`,
      optionStyleType: "st-decimal",
      itemSeperator: "false",
    },
  },
};