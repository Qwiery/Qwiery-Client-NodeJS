var qwiery = require("../index");
exports.getSentiment = function(test) {

    qwiery.getSentiment("The massive recall of one of Samsung's flagship devices is an embarrassing setback for the world's biggest selling smartphone maker. The Note 7 was unveiled just a month ago, and big rival Apple (AAPL, Tech30) is expected to show off its new smartphone next week.").then(function(r) {
        console.log(r);
        test.done();
    });
};


exports.parse1 = function(test) {

    qwiery.parseText("Yeah, we got a lot to do! We gotta think about the flowers, the caterers, the music…").then(function(p) {
        console.log("\n\n------------------------------------");
        console.log(p);
        test.done();
    });

};

exports.parse2 = function(test) {

    qwiery.parseText("Well, umm, not much. But, I was just thinking that since those guys just got engaged that maybe it would be nice if they had some privacy, y’know? So, could I just move in with you for a couple days?").then(function(p) {
        console.log("\n\n------------------------------------");
        console.log(p);
        test.done();
    });

};

exports.getNouns = function(test) {
    var count = parseInt(Math.floor(Math.random() * 10 + 5));
    qwiery.randomWords("Noun", null, count).then(function(r) {
        console.log("\n\n------------------------------------");
        console.log(count + " random nouns:");
        console.log(r);
        test.ok(r.length === count);
        test.done();
    });
};

exports.getVerbs = function(test) {
    var count = parseInt(Math.floor(Math.random() * 10 + 5));
    qwiery.randomWords("Verbs", null, count).then(function(r) {
        console.log("\n\n------------------------------------");
        console.log(count + " random verbs:");
        console.log(r);
        test.ok(r.length === count);
        test.done();
    });
};

exports.getAdjectives = function(test) {
    var count = parseInt(Math.floor(Math.random() * 10 + 5));
    qwiery.randomWords("Adjectives", null, count).then(function(r) {
        console.log("\n\n------------------------------------");
        console.log(count + " random adjectives:");
        console.log(r);
        test.ok(r.length === count);
        test.done();
    });
};

exports.getAdverbs = function(test) {
    var count = parseInt(Math.floor(Math.random() * 10 + 5));
    qwiery.randomWords("Adverbs", null, count).then(function(r) {
        console.log("\n\n------------------------------------");
        console.log(count + " random adverbs:");
        console.log(r);
        test.ok(r.length === count);
        test.done();
    });
};

exports.getPOS = function(test) {
    var text = "The tea will be cold.";
    qwiery.getPOS(text).then(function(r) {
        console.log("\n\n------------------------------------");
        console.log("POS in '" + text + "':");
        console.log(r.pos);
        test.done();
    });
};

exports.getVerbs = function(test) {
    var text = "The exit of UK will have dramatic consequences.";
    qwiery.getVerbs(text).then(function(r) {
        console.log("\n\n------------------------------------");
        console.log("Verbs in '" + text + "':");
        console.log(r);
        test.done();
    });
};

exports.lookup = function(test) {
    var count = parseInt(Math.floor(Math.random() * 10 + 5));
    qwiery.lookup("Constitutional").then(function(r) {
        console.log("\n\n------------------------------------");
        console.log("Constitutional:");
        for(var i = 0; i < r.length; i++) {
            var lup = r[i];
            console.log("- " + lup.def);
        }
        test.done();
    });
};

exports.detect = function(test) {
    var samples = [
        {
            text: "Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions...",
            language: "English"
        },
        {
            text: "In der Flüchtlingsdebatte reden sich die Politiker aller Parteien bereits seit Monaten um Kopf und Kragen. Vor allem der Kurs von Bundeskanzlerin Angela Merkel steht hier nach wie vor in der Kritik. Mit den Bluttaten von Würzburg, München, Reutlingen und Ansbach scheinen sich Befürchtungen auf Seiten ihrer Gegner weiter zu bestätigen und zu verschärfen.",
            language: "German"
        },
        {
            text: "Lymma ycymreith ha bryein eccluys Teliau o lanntaf arodes breenhined hinn ha touyssocion cymry yntrycyguidaul dy eccluys teilau hac dir escip oll gueti ef amcytarnedic oaudurdaut papou rumein yholl cyfreith didi hac dy thir. hac di dair. ryd o pop guasanaith breennin bydaul. heb mair. heb cyghellaur. heb cyhoith. dadlma ymeun gulat hac nydieithyr. heb luyd. heb gauayl. heb guylma ycyfreith idi ynhollaul. o leityr o latrat. otreis. odynyorn. ocynluyn hac o losc. oamrysson canguayt ahebguayt. y diruy hay camcul yndi didi yn hollaul. odorri naud ynn lann hac yndieithyr lann. orachot ynn luhyn hac dieithyr luhyn. ocyrch ypopmynnic ardir teliau. hay guir. hay braut dy lytu yrecluys ygundy teliau ynnlann taf. hac ny lys. dufyr ha guell. hac choyt ha mays yncyfrytin dy lytu teliau. cyfnofut habathoriayth ynn lanntaf hac aperua ardir teliau dyr loggou adiscynno nythir ypopmynnic yt uoy. ryd rac brennin aracpaup namyn dy teliau a+ yeccluys lantam. ha dy escyp. harmefyl har sarhayt har cam. har ennuet agunech brennhin morcannhuc hay gur hay guas dy escop teliau hac dygur hac dy guas. dyuot brennhin morcannhuc ygundy teliau yn lann taf. dygunethur guir ha cyfreith.",
            language: "Welsh"
        },
        {
            text: "Pagalaglagon gayud ninyo ang tanang mga dapit diin ang mga nasud nga inyong pagapapahawaon, nanag-alagad sa ilang mga dios, sa ibabaw sa hatag-as nga kabukiran, ug sa ibabaw sa kabungtoran, ug sa ilalum sa tagsatagsa ka kahoy nga lunhaw",
            language: "Cebuano"
        },
        {
            text: "Actualmente podemos encontrar diferentes tipos de hospitales y muchos se diferencian según el tipo de patología. Dentro de las especialidades que existen dentro de las áreas de la medicina está cardiólogía, oftalmólogía, otorrinolaringólogía, odontólogía, oncólogía y otras especialidades que pertenecen a los hospitales generales.",
            language: "Spanish"
        }
    ];
    var promises = [];
    for(var i = 0; i < samples.length; i++) {
        var sample = samples[i];
        promises.push(qwiery.detectLanguage(sample.text));
    }
    Promise.all(promises).then(function(results) {
        for(var i = 0; i < results.length; i++) {
            var result = results[i];
            test.ok(result.languages[0].language.toLowerCase() === samples[i].language.toLowerCase());
        }
        test.done();
    });

};
