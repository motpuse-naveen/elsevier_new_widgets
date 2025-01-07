const questions_data = {
  sharedProperties: {
    maxWidth: "960px", //"100%", "90%", "760px", "1024px"
    alignment: "center", //"center", "left"
  },
  question_groups: {
    group1: {
      id: "group1",
      type: "accordian",
      placeholder_id: "group1_placeholder",
      items: [
        {
            title: `<i>abductor</i>`,
            audio: `data/media/audio/group1/abductor.mp3`,
            explanation: `<span>ab-DUK-tor</span>`,
        },
        {
            title: `abnormal`,
            audio: `data/media/audio/group1/abnormal.mp3`,
            explanation: `ab-NOR-mal`,
        },
        {
            title: `adrenal glands`,
            audio: `data/media/audio/group1/adrenal_glands.mp3`,
            explanation: `ah-DRE-nal glanz`,
        },
        
      ],
      titleElement: "h4",//"h1", "h2", "h3", "h4", "h5", "h6" ,""
      itemSeperator: "false",
    },
    group2: {
      id: "group2",
      type: "accordian",
      placeholder_id: "group2_placeholder",
      items: [
        {
          title: `acr/o`,
          explanation: `<span>extremities, top, extreme point</span>`,
        },
        {
          title: `chondr/o`,
          explanation: `cartilage`,
        },
        {
          title: `abdomin/o`,
          explanation: `<span>abdomen</span>`,
      },
      ],
      titleElement: "h4",//"h1", "h2", "h3", "h4", "h5", "h6" ,""
      itemSeperator: "false",
    },
    group3: {
      id: "group3",
      type: "reflective_writing", //Fill-in-the-Blank
      placeholder_id: "group3_placeholder",
      items: [
        {
            title: `<div style="display:inline;">terms you have <strong>learned</strong> in this chapter are presented here with their pronunciations. The CAPITAL letters indicate the accented syllable.</div>`,
            feedback: `<span>pertaining to the cerebrum, or largest part of the brain</span>`,
        },
        {
          title: `biopsy`,
          feedback: `<span>process of viewing life (removal of living tissue and viewing it under a microscope)</span>`,
        },
        {
          title: `adenitis`,
          feedback: `<span>inflammation of a gland</span>`,
        },
        {
          title: `cephalic`,
          feedback: `<span>pertaining to the head</span>`,
        },
        {
          title: `carcinoma`,
          feedback: `<span>tumor that is cancerous (cancerous tumor)</span>`,
        },
      ],
      optionStyleType: "st-decimal",
      itemSeperator: "true",
    },
  },
};