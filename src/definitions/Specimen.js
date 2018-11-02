
const Specimen = { title: {type: "string", title: "Title", default: "A new task"},
        text: {type: "string", title: "Text", default: "aviable",enum: ["aviable","stoop"]},
        done: {type: "boolean", title: "Done?", default: false}
};

export default Specimen