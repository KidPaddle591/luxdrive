fetch("luxdrive_site_data_full.json")
    .then(function(response){
        if (!response.ok){
            throw new Error ("Erreur : le fichier JSON n'a pas pu être chargé");
        }
        return response.json();
    })
    
    .then(function(data){
/*Recuperation des éléments fixes*/
        let banner = data.pagesContent.Accueil.heroBanner;
        document.getElementById("banner-title").textContent = banner.title;
        document.getElementById("banner-subtitle").textContent = banner.subtitle;
        document.getElementById("banner-cta").textContent = banner.cta;
        document.getElementById("banner-image").src = banner.image;
    
/*Recuperation des éléments de la navbar*/
        let navbar = document.getElementById("navbar"); /* on definit dans quel element on travail (navbar) */
        for (let i=0; i<data.navigation.length; i++){ /* Boucle pour parcourir le tableau navigation*/
            let li = document.createElement("li"); /*pour chaque itération on créé un élément li*/
            let pages = data.navigation[i]["label"] /* on recupere l'element label du tableau correspondant à l'itération en cours */
            let url = data.navigation[i]["url"] /* on recupere l'element label du tableau correspondant à l'itération en cours */
            li.classList.add("classLink")
            let link = document.createElement("a");
            link.href=url;
            link.textContent=pages
            li.appendChild(link);
            navbar.appendChild(li);
        }
    
/*Boucle pour recuperer les éléments stats*/
        let divStats = document.getElementById("stats");
        for (let i=0; i<data.pagesContent.Accueil.stats.length;i++){ /* Boucle pour parcourir le tableau stats*/
            let divStatsEach = document.createElement("div"); /*On créé une div dans la div Stats*/
            divStatsEach.classList.add("statsStyle") /* On ajoute à cette div la classe StatsStyle pour recuperer la mise en forme css*/
            let statsTable = data.pagesContent.Accueil.stats[i] /*on recupère le tableau complet stats*/
            let titleStats=document.createElement("h2"); /*On créé le titre pour chaque stats avec un h2*/
            titleStats.textContent=data.pagesContent.Accueil.stats[i]["label"]; /*On recupere dans le tableau stats, la ligen label et on l'ajoute à titleStatsd*/
            divStatsEach.appendChild(titleStats); /* on ajoute le contenu de titleStats dans le HTML (enfant de Divstats)*/
            let infoStats=document.createElement("p"); /*On créé le texte pour chaque stat avec un p*/
            infoStats.textContent=data.pagesContent.Accueil.stats[i]["value"]; /* On ajoute dans ce p les informations*/
            divStatsEach.appendChild(infoStats); /* On push dans le html*/
            divStats.appendChild(divStatsEach);
        }
    
/*Boucle pour recuperer les testimonials*/
        let divTesti=document.getElementById("testimonials");
        for (let i=0; i<data.testimonials.length; i++){
            let divtestiEach = document.createElement("div"); /*On créé une div dans la div testimonials*/
            divtestiEach.classList.add("testiStyle"); /* On ajoute à cette div la classe testiStyle pour recuperer la mise en forme css */
            let testiTable=data.testimonials[i]; /*on recupère le tableau complet stats*/
            let nameTesti=document.createElement("h3");
            nameTesti.textContent=data.testimonials[i].name;
            divtestiEach.appendChild(nameTesti);
            let noteTesti=document.createElement("p");
            noteTesti.textContent=data.testimonials[i].note
            divtestiEach.appendChild(noteTesti);
            let messageTesti=document.createElement("p");
            messageTesti.textContent=data.testimonials[i].message
            divtestiEach.appendChild(messageTesti);
            divTesti.appendChild(divtestiEach);
        }
    })   
