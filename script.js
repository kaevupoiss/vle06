(function() {
    "use strict";
    
    //clock

    document.addEventListener("DOMContentLoaded", function() {
        
        let c = document.getElementById("clock");

        setInterval(updateClock, 100);
        
        function updateClock() {
            
            let date = new Date();
            let h = date.getHours();
            let m = date.getMinutes();
            let s = date.getSeconds();
            let suffix = 'EL'
            
            if (h > 12) {
                suffix = 'PL'
            }
            if (h > 13) {
                h -= 12
            }

            if (h < 10) {
                h = "0" + h;
            }

            if (m < 10) {
                m = "0" + m;
            }

            if (s < 10) {
                s = "0" + s;
            }

            c.innerHTML = h + ":" + m + ":" + s + ' ' + suffix;
            
        };
        
    });
    
    // forms
    
    document.getElementById("form").addEventListener("submit", estimateDelivery);
    
    let e = document.getElementById("delivery");
    e.innerHTML = "0,00 &euro;";
    
    function estimateDelivery(event) {
        event.preventDefault();
        
        let summa = 0;

        let eesnimi = document.getElementById("fname").value
        let perenimi = document.getElementById("lname").value

        var letters = /^[A-Za-z]+$/;

        if (eesnimi == '') {
            alert("Palun sisestage eesnimi");

            return;
        }
        if (!eesnimi.match(letters)) {
            alert("Eesnimi tohib sisaldada ainult tähti");

            return;
        }
        if (perenimi == '') {
            alert("Palun sisestage perenimi");

            return;
        }
        if (!perenimi.match(letters)) {
            alert("Perenimi tohib sisaldada ainult tähti");

            return;
        }

        let linn = document.getElementById("linn");
        
        if (linn.value === "") {
            
            alert("Palun valige linn nimekirjast");
            
            linn.focus();
            
            return;
        }

        switch (linn.value) {
            case 'tln':
                summa += 0;
                break;
            case 'trt':
                summa += 2.5;
                break;
            case 'nrv':
                summa += 2.5;
                break;
            case 'prn':
                summa += 3;
                break;
            default:
                summa += 0;
                break;
        }

        let kingitus = document.getElementById('v1').checked;
        if (kingitus) summa += 5;

        let kontaktivaba = document.getElementById('v2').checked;
        if (kontaktivaba) summa += 1;

        let eraisik = document.getElementById('r1').checked;
        let ettevote = document.getElementById('r2').checked;

        if (!(ettevote || eraisik)) {
            alert("Palun valige kas eraisik või ettevõte");
            
            return;
        }

        if (ettevote) summa /= 1.2;

        e.innerHTML = Math.round(summa * 100) / 100 + ' &euro;';
        
        console.log("Tarne hind on arvutatud");
    }
    
})();

// map

let mapAPIKey = "AqLLRE37SJGqIxXEYxezPUa6fF2oCzl3cvG4n05FtFIVBrotBYxchpMYYpwuxBak";

let map;
let infobox;

function GetMap() {
    
    "use strict";

    let centerPoint = new Microsoft.Maps.Location(
            58.768071,
            25.818786
        );

    map = new Microsoft.Maps.Map("#map", {
        credentials: mapAPIKey,
        center: centerPoint,
        zoom: 7,
        mapTypeId: Microsoft.Maps.MapTypeId.road,
        disablePanning: true
    });
    
    infobox = new Microsoft.Maps.Infobox(centerPoint, {
        visible: false
    });

    infobox.setMap(map);

    let UTLocation = new Microsoft.Maps.Location(
        58.38104, 
        26.71992
    );
    let pushUTpin = new Microsoft.Maps.Pushpin(UTLocation, {
        title: 'Tartu Ülikool',
        text: 'UT'
    });
    pushUTpin.metadata = {
        title: 'Tartu Ülikool',
        description: 'Hea koht'
    };
    Microsoft.Maps.Events.addHandler(pushUTpin, 'click', pushpinClicked);

    let TLULocation = new Microsoft.Maps.Location(
        59.438805,
        24.771752
    );
    let pushTLUpin = new Microsoft.Maps.Pushpin(TLULocation, {
        title: 'Tallinna Ülikool',
        text: 'TLÜ'
    });
    pushTLUpin.metadata = {
        title: 'Tallinna Ülikool',
        description: 'Ka hea koht'
    };
    Microsoft.Maps.Events.addHandler(pushTLUpin, 'click', pushpinClicked);

    map.entities.push(pushUTpin);
    map.entities.push(pushTLUpin);

}

function pushpinClicked(e) {
    if (e.target.metadata) {
        infobox.setOptions({
            location: e.target.getLocation(),
            title: e.target.metadata.title,
            description: e.target.metadata.description,
            visible: true
        });
    }
}

// https://dev.virtualearth.net/REST/v1/Locations?q=1000 Vin Scully Ave, Los Angeles,CA&key=YOUR_KEY_HERE

