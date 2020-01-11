const express = require("express");
const app = express();
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");
const request = require("request");

console.log("the site is starting");

let documents_arr = [];
let state = "Illinois";

let cities_arr = ["Abingdon"];//, "Addieville", "Addison", "Adeline", "Albany", "Albers", "Albion", "Aledo", "Alexis", "Algonquin", "Alhambra", "Allendale", "Allenville", "Allerton", "Alma", "Alorton", "Alpha", "Alsey", "Alsip", "Altamont", "Alto Pass", "Alton", "Altona", "Alvan", "Amboy", "Anchor", "Andalusia", "Andover", "Anna", "Annawan	Town", "Antioch", "Apple River", "Arcola", "Arenzville", "Argenta", "Arlington", "Arlington Heights", "Armington", "Aroma Park", "Arrowsmith", "Arthur", "Ashkum", "Ashland", "Ashley", "Ashmore", "Ashton", "Assumption", "Astoria	Town", "Athens", "Atkinson	Town", "Atlanta", "Atwood", "Auburn", "Augusta", "Aurora", "Ava", "Aviston", "Avon", "Baldwin", "Banner", "Bannockburn", "Bardolph", "Barrington", "Barrington Hills", "Barry", "Bartelso", "Bartlett", "Bartonville", "Basco", "Batavia", "Batchtown", "Bath", "Bay View Gardens", "Baylis", "Beach Park", "Beardstown", "Beaverville", "Beckemeyer", "Bedford Park", "Beecher", "Beecher City", "Belgium", "Belknap", "Belle Prairie City	Town", "Belle Rive", "Belleville", "Bellevue", "Bellflower", "Bellmont", "Bellwood", "Belvidere", "Bement", "Benld", "Bensenville", "Benson", "Bentley	Town", "Benton", "Berkeley", "Berlin", "Berwyn", "Bethalto", "Bethany", "Big Rock", "Biggsville", "Bingham", "Bishop Hill", "Bismarck", "Blandinsville", "Bloomingdale", "Bloomington", "Blue Island", "Blue Mound", "Bluffs", "Bluford", "Bolingbrook", "Bondville", "Bone Gap", "Bonfield", "Bonnie", "Bourbonnais", "Bowen", "Braceville", "Bradford", "Bradley", "Braidwood", "Breese", "Bridgeport", "Bridgeview", "Brighton", "Brimfield", "Broadlands", "Broadview", "Broadwell", "Brocton", "Brookfield", "Brooklyn", "Brookport", "Broughton", "Browning", "Browns", "Brownstown", "Brussels", "Bryant", "Buckingham", "Buckley", "Buckner", "Buda", "Buffalo", "Buffalo Grove", "Bull Valley", "Bulpitt", "Buncombe", "Bunker Hill", "Burbank", "Bureau Junction", "Burlington", "Burnham", "Burnt Prairie", "Burr Ridge", "Bush", "Bushnell", "Butler", "Byron", "Cabery", "Cahokia", "Cairo", "Caledonia", "Calhoun", "Calumet City", "Calumet Park", "Camargo", "Cambria", "Cambridge", "Camden", "Camp Point", "Campbell Hill", "Campton Hills", "Campus", "Canton", "Cantrall", "Capron", "Carbon Cliff", "Carbon Hill", "Carbondale", "Carlinville", "Carlock", "Carlyle", "Carmi", "Carol Stream", "Carpentersville", "Carrier Mills", "Carrollton", "Carterville", "Carthage", "Cary", "Casey", "Caseyville", "Catlin", "Cave-In-Rock", "Cedar Point", "Cedarville", "Central City", "Centralia", "Centreville", "Cerro Gordo", "Chadwick", "Champaign", "Charleston", "Chandlerville", "Channahon", "Chapin", "Chatham", "Chatsworth	Town", "Chebanse", "Chenoa", "Cherry", "Cherry Valley", "Chester", "Chesterfield", "Chicago", "Chicago Heights", "Chicago Ridge", "Chillicothe", "Chrisman", "Christopher", "Cicero	Town", "Cisco", "Cisne", "Cissna Park", "Claremont", "Clarendon Hills", "Clay City", "Clayton", "Clear Lake", "Cleveland", "Clifton", "Clinton", "Coal City", "Coal Valley", "Coalton", "Coatsburg", "Cobden", "Coffeen", "Colchester", "Coleta", "Colfax", "Collinsville", "Colona", "Colp", "Columbia", "Columbus", "Compton", "Concord", "Congerville", "Cooksville", "Cordova", "Cornell", "Cortland	Town", "Coulterville", "Country Club Hills", "Countryside", "Cowden", "Crainville", "Creal Springs", "Crescent City", "Crest Hill", "Creston", "Crestwood", "Crete", "Creve Coeur", "Crossville", "Crystal Lake", "Cuba", "Cullom", "Curran", "Cutler", "Cypress", "Dahlgren", "Dakota	Town", "Dallas City", "Dalton City", "Dalzell", "Damiansville", "Dana", "Danforth", "Danvers", "Danville", "Darien", "Davis", "Davis Junction", "Dawson", "DeKalb", "De Land", "De Pue", "De Soto", "Decatur", "Deer Creek", "Deer Grove", "Deer Park", "Deerfield", "Delavan", "Des Plaines", "Detroit", "DeWitt", "Diamond", "Dieterich", "Divernon", "Dix", "Dixmoor", "Dixon", "Dolton", "Dongola", "Donnellson", "Donovan", "Dorchester", "Dover", "Dowell", "Downers Grove", "Downs", "Du Bois", "Du Quoin", "Dunfermline", "Dunlap", "Dupo", "Durand", "Dwight", "Eagarville", "Earlville", "East Alton", "East Brooklyn", "East Cape Girardeau", "East Carondelet", "East Dubuque", "East Dundee", "East Galesburg", "East Gillespie", "East Hazel Crest", "East Moline", "East Peoria", "East St. Louis", "Easton", "Eddyville", "Edgewood", "Edinburg", "Edwardsville", "Effingham", "El Dara", "El Paso", "Elburn", "Eldorado", "Eldred", "Elgin", "Elizabeth", "Elizabethtown", "Elk Grove Village", "Elkhart", "Elkville", "Elliott", "Ellis Grove", "Ellisville", "Ellsworth", "Elmhurst", "Elmwood", "Elmwood Park", "Elsah", "Elvaston", "Elwood", "Emden", "Emington", "Energy", "Enfield", "Equality", "Erie", "Essex", "Eureka", "Evanston", "Evansville", "Evergreen Park", "Ewing", "Exeter", "Fairbury", "Fairfield", "Fairmont City", "Fairmount", "Fairview", "Fairview Heights", "Farina", "Farmer City", "Farmersville", "Farmington", "Fayetteville", "Ferris", "Fidelity", "Fieldon", "Fillmore", "Findlay", "Fisher", "Fithian", "Flanagan", "Flat Rock", "Flora", "Florence", "Flossmoor", "Foosland", "Ford Heights", "Forest City", "Forest Park", "Forest View", "Forrest", "Forreston", "Forsyth", "Fox Lake", "Fox River Grove", "Frankfort", "Franklin", "Franklin Grove", "Franklin Park", "Freeburg", "Freeman Spur", "Freeport", "Fulton", "Fults", "Galatia", "Galena", "Galesburg", "Galva", "Gardner", "Garrett", "Gays", "Geneseo", "Geneva", "Genoa", "Georgetown", "German Valley", "Germantown", "Germantown Hills", "Gibson City", "Gifford", "Gilberts", "Gillespie", "Gilman", "Girard", "Gladstone", "Glasford", "Glasgow", "Glen Carbon", "Glen Ellyn", "Glencoe", "Glendale Heights", "Glenview", "Glenwood", "Godfrey", "Godley", "Golconda", "Golden", "Golden Gate", "Golf", "Good Hope", "Goodfield", "Goreville", "Gorham", "Grafton", "Grand Tower", "Grand Ridge", "Grandview", "Granite City", "Grant Park", "Grantfork", "Granville", "Grayslake", "Grayville", "Green Oaks", "Green Valley", "Greenfield", "Greenup", "Greenview", "Greenville", "Greenwood", "Gridley", "Griggsville", "Gulfport", "Gurnee", "Hainesville", "Hamburg", "Hamel", "Hamilton", "Hammond", "Hampshire", "Hampton", "Hanaford", "Hanna City", "Hanover", "Hanover Park", "Hardin", "Harmon", "Harrisburg", "Harristown", "Hartford", "Hartsburg", "Harvard", "Harvel", "Harvey", "Harwood Heights", "Havana", "Hawthorn Woods", "Hazel Crest", "Hebron", "Hecker", "Henderson", "Hennepin", "Henning", "Henry", "Herrick", "Herrin", "Herscher", "Hettick", "Heyworth", "Hickory Hills", "Hidalgo", "Highland", "Highland Park", "Highwood", "Hillcrest", "Hillsboro", "Hillsdale", "Hillside", "Hillview", "Hinckley", "Hindsboro", "Hinsdale", "Hodgkins", "Hoffman", "Hoffman Estates", "Holiday Hills", "Hollowayville", "Homer", "Homer Glen", "Hometown", "Homewood", "Hoopeston", "Hooppole", "Hopedale", "Hopewell", "Hopkins Park", "Hoyleton", "Hudson", "Huey", "Hull", "Humboldt", "Hume", "Huntley", "Hurst", "Hutsonville", "Illiopolis", "Ina", "Indian Creek", "Indian Head Park", "Indianola", "Industry", "Inverness", "Iola", "Ipava", "Iroquois", "Irving", "Irvington", "Irwin", "Island Lake", "Itasca", "Iuka", "Ivesdale", "Jacksonville", "Jeffersonville", "Jeisyville", "Jerome", "Jerseyville", "Jewett", "Johnsburg", "Johnston City", "Johnsonville", "Joliet", "Jonesboro", "Joppa", "Joy", "Junction", "Junction City", "Justice", "Kampsville", "Kane", "Kaneville", "Kangley", "Kankakee", "Kansas", "Kappa", "Karnak", "Kaskaskia", "Keenes", "Keithsburg", "Keensburg", "Kell", "Kempton", "Kenilworth", "Kenney", "Kewanee", "Keyesport", "Kilbourne", "Kildeer", "Kincaid", "Kinderhook", "Kingston", "Kingston Mines", "Kinmundy", "Kinsman", "Kirkland", "Kirkwood", "Knoxville", "La Fayette", "La Grange", "La Grange Park", "La Harpe", "La Moille", "La Prairie	Town", "La Rose", "LaSalle", "Lacon", "Ladd", "Lake Barrington", "Lake Bluff", "Lake in the Hills", "Lake Ka-ho", "Lake Forest", "Lake Villa", "Lake Zurich", "Lakemoor", "Lakewood", "Lanark", "Lansing", "Latham", "Lawrenceville", "Le Roy", "Leaf River", "Lebanon", "Lee", "Leland", "Leland Grove", "Lemont", "Lena", "Lenzburg", "Leonore", "Lerna", "Lewistown", "Lexington", "Liberty", "Libertyville", "Lily Lake", "Lima", "Limestone", "Lincoln", "Lincolnshire", "Lincolnwood", "Lindenhurst", "Lisbon", "Lisle", "Litchfield", "Little York", "Littleton", "Liverpool", "Livingston", "Loami", "Lockport", "Loda", "Lomax", "Lombard", "London Mills", "Long Creek", "Long Grove", "Long Point", "Longview", "Loraine", "Lostant", "Louisville", "Loves Park", "Lovington", "Ludlow", "Lyndon", "Lynnville", "Lynwood", "Lyons", "Macedonia", "Machesney Park", "Mackinaw", "Macomb", "Macon", "Madison", "Maeystown", "Magnolia", "Mahomet", "Makanda", "Malden", "Malta", "Manchester", "Manhattan", "Manito", "Manlius", "Mansfield", "Manteno", "Maple Park", "Mapleton", "Maquon", "Marengo", "Marietta", "Marine", "Marion", "Marissa", "Mark", "Markham", "Maroa", "Marquette Heights", "Marseilles", "Marshall", "Martinton", "Martinsville", "Maryville", "Mascoutah", "Mason	Town", "Mason City", "Matherville", "Matteson", "Mattoon", "Maunie", "Maywood", "Mazon", "McClure", "McCook", "McCullom Lake", "McHenry", "McLean", "McLeansboro", "McNabb", "Mechanicsburg", "Media", "Medora", "Melrose Park", "Melvin", "Mendon", "Mendota", "Menominee", "Meredosia", "Merrionette Park", "Metamora", "Metcalf", "Metropolis", "Mettawa", "Middletown", "Midlothian", "Milan", "Milford", "Mill Creek", "Mill Shoals", "Millbrook", "Milledgeville", "Millington", "Millstadt", "Milton", "Mineral", "Minier", "Minonk", "Minooka", "Modesto", "Mokena", "Moline", "Momence", "Monee", "Monmouth", "Monroe Center", "Montgomery", "Monticello", "Montrose", "Morris", "Morrison", "Morrisonville", "Morton", "Morton Grove", "Mound City", "Mound Station", "Mounds", "Mount Auburn", "Mount Carmel", "Mount Carroll", "Mount Clare", "Mount Erie", "Mount Morris", "Mount Olive", "Mount Prospect", "Mount Pulaski", "Mount Sterling", "Mount Vernon", "Mount Zion", "Moweaqua", "Muddy", "Mulberry Grove", "Muncie", "Mundelein", "Murphysboro", "Murrayville", "Naperville", "Naplate", "Naples	Town", "Nashville", "Nason", "Nauvoo", "Nebo", "Nelson", "Neoga", "Neponset", "New Athens", "New Baden", "New Bedford", "New Berlin", "New Boston", "New Burnside", "New Canton	Town", "New Douglas", "New Grand Chain", "New Haven", "New Holland", "New Lenox", "New Milford", "New Minden", "New Salem", "New Windsor", "Newark", "Newman", "Newton", "Niantic", "Niles", "Nilwood	Town", "Noble", "Nokomis", "Nora", "Normal	Town", "Norridge", "Norris", "Norris City", "North Aurora", "North Barrington", "North Chicago", "North City", "North Henderson", "North Pekin", "North Riverside", "North Utica", "Northbrook", "Northfield", "Northlake", "Norwood", "O'Fallon", "Oak Brook", "Oak Grove", "Oak Forest", "Oak Lawn", "Oak Park", "Oakbrook Terrace", "Oakdale", "Oakford", "Oakland", "Oakwood", "Oakwood Hills", "Oblong", "Oconee", "Odell", "Odin", "Ogden", "Oglesby", "Ohio", "Ohlman", "Okawville", "Old Mill Creek", "Old Ripley", "Old Shawneetown", "Olmsted", "Olney", "Olympia Fields", "Omaha", "Onarga", "Oneida", "Oquawka", "Orangeville", "Oreana", "Oregon", "Orient", "Orion", "Orland Hills", "Orland Park", "Oswego", "Ottawa", "Otterville	Town", "Owaneco", "Palatine", "Palestine	Town", "Palmer", "Palmyra", "Palos Heights", "Palos Hills", "Palos Park", "Pana", "Panama", "Panola", "Papineau", "Paris", "Park City", "Park Forest", "Park Ridge", "Parkersburg", "Patoka", "Paw Paw", "Pawnee", "Paxton", "Payson", "Pearl", "Pearl City", "Pecatonica", "Pekin", "Peoria", "Peoria Heights", "Peotone", "Percy", "Perry", "Peru", "Pesotum", "Petersburg", "Phillipstown", "Philo", "Phoenix", "Pierron", "Pinckneyville", "Pingree Grove", "Piper City", "Pittsburg", "Pittsfield", "Plainfield", "Plainville", "Plano", "Plattville", "Pleasant Hill", "Pleasant Plains", "Plymouth", "Pocahontas", "Polo", "Pontiac", "Pontoon Beach", "Pontoosuc", "Poplar Grove", "Port Barrington", "Port Byron", "Posen", "Potomac", "Prairie City", "Prairie du Rocher", "Prairie Grove", "Princeton", "Princeville", "Prophetstown", "Prospect Heights", "Pulaski", "Quincy", "Radom", "Raleigh", "Ramsey", "Rankin", "Ransom", "Rantoul", "Rapids City", "Raritan", "Raymond", "Red Bud", "Reddick", "Redmon", "Reynolds", "Richmond", "Richton Park", "Richview", "Ridge Farm", "Ridgway", "Ridott", "Ringwood", "Rio", "Ripley", "River Forest", "River Grove", "Riverdale", "Riverside", "Riverton", "Riverwoods", "Roanoke", "Robbins", "Roberts", "Robinson", "Rochelle", "Rochester", "Rock City", "Rock Falls", "Rock Island", "Rockbridge", "Rockdale", "Rockford", "Rockton", "Rockwood", "Rolling Meadows", "Romeoville", "Roodhouse", "Roscoe", "Rose Hill", "Roselle", "Rosemont", "Roseville", "Rosiclare", "Rossville", "Round Lake", "Round Lake Beach", "Round Lake Heights", "Round Lake Park", "Roxana", "Royal", "Royal Lakes", "Royalton", "Ruma", "Rushville", "Russellville", "Rutland", "Sadorus", "Sailor Springs", "St. Anne", "St. Augustine", "St. Charles", "St. David", "St. Elmo", "St. Francisville", "St. Jacob", "St. Johns", "St. Joseph", "St. Libory", "St. Peter", "Ste. Marie", "Salem", "Sammons Point", "San Jose", "Sandoval", "Sandwich", "Sauget", "Sauk Village", "Saunemin", "Savanna", "Savoy", "Sawyerville", "Saybrook", "Scales Mound", "Schaumburg", "Schiller Park", "Schram City", "Sciota", "Scottville", "Seaton", "Seatonville", "Secor", "Seneca", "Sesser", "Shabbona", "Shannon", "Shawneetown", "Sheffield", "Shelbyville", "Sheldon", "Sheridan", "Sherman", "Sherrard", "Shiloh", "Shipman", "Shorewood", "Shumway", "Sibley", "Sidell", "Sidney", "Sigel	Town", "Silvis", "Simpson", "Sims", "Skokie", "Sleepy Hollow", "Smithboro", "Smithfield", "Smithton", "Somonauk", "Sorento", "South Barrington", "South Beloit", "South Chicago Heights", "South Elgin", "South Holland", "South Jacksonville", "South Pekin", "South Roxana", "South Wilmington", "Southern View", "Sparland", "Sparta", "Spaulding", "Spillertown", "Spring Bay", "Spring Grove", "Spring Valley", "Springerton", "SpringfieldState capital", "Standard", "Standard City", "Stanford", "Staunton", "Steeleville", "Steger", "Sterling", "Steward", "Stewardson", "Stickney", "Stillman Valley", "Stockton", "Stone Park", "Stonefort", "Stonington", "Stoy", "Strasburg", "Strawn", "Streamwood", "Streator", "Stronghurst", "Sublette", "Sugar Grove", "Sullivan", "Summerfield", "Summit", "Sumner", "Sun River Terrace", "Swansea", "Sycamore", "Symerton", "Table Grove", "Tallula", "Tamaroa", "Tamms", "Tampico", "Taylor Springs", "Taylorville", "Tennessee", "Teutopolis", "Thawville", "Thayer", "Thebes", "Third Lake", "Thomasboro", "Thompsonville", "Thomson", "Thornton", "Tilden", "Tilton", "Timberlane", "Time", "Tinley Park", "Tiskilwa", "Toluca", "Toledo", "Tolono", "Toulon", "Tonica", "Topeka	Town", "Tovey", "Towanda", "Tower Hill", "Tower Lakes", "Tremont", "Trenton", "Trout Valley", "Troy", "Troy Grove", "Tuscola", "Virginia", "Ullin", "Union", "Union Hill", "University Park", "Urbana", "Ursa", "Valier", "Valley City", "Valmeyer", "Vandalia", "Varna", "Venedy", "Venice", "Vergennes", "Vermilion", "Vermont", "Vernon", "Vernon Hills", "Verona", "Versailles", "Victoria", "Vienna", "Villa Grove", "Villa Park", "Viola", "Virden", "Virgil", "Volo", "Wadsworth", "Waggoner", "Walnut", "Walnut Hill", "Walshville", "Waltonville", "Wamac", "Wapella", "Warren", "Warrensburg", "Warrenville", "Warsaw", "Washburn", "Washington", "Washington Park", "Wataga", "Waterloo", "Waterman", "Watseka", "Watson", "Wauconda", "Waukegan", "Waverly", "Wayne", "Wayne City", "Waynesville", "Weldon", "Wellington", "Wenona", "Wenonah", "West Brooklyn", "West Chicago", "West City", "West Dundee", "West Frankfort", "West Peoria", "West Point", "West Salem", "Westchester", "Western Springs", "Westfield", "Westmont", "Westville", "Wheeler", "Wheaton", "Wheeling", "White City", "White Hall", "Whiteash", "Williamsfield", "Williamson", "Williamsville", "Willisville", "Willow Hill", "Willow Springs", "Willowbrook", "Wilmette", "Wilmington", "Wilmington", "Wilsonville", "Winchester", "Windsor", "Windsor", "Winfield", "Winnebago", "Winnetka", "Winslow", "Winthrop Harbor", "Witt", "Wonder Lake", "Wood Dale", "Wood River", "Woodhull", "Woodland", "Woodlawn", "Woodridge", "Woodson", "Woodstock", "Worden", "Worth", "Wyanet", "Wyoming", "Xenia", "Yale", "Yates City", "Yorkville", "Zeigler", "Zion"];

let cities_num = 0; // incrementing through all 1299 cities and towns in illinois
let page_num_city = 1; // number page on given city (can do 5 at a time, then need to switch back)
let page_num_main = 5; // number in a row on main page (can do 5 at a time, then need to switch back)
let file_num = 0; // number to tack onto filename after 10,000(?) objects

const scrape = () => {
  let url;

  // search by city five times
  if (page_num_city % 5 != 0) {
    url = "http://publicemailrecords.com/city/" + cities_arr[cities_num] + "/Illinois?page=" + page_num_city;
    page_num_city++;
    request(url, { 'User-Agent': "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36" }, (err, response, html) => {
      if (err) {
        console.log("err : ", err);
        res.json({ error: "error "});
      }

      let $ = cheerio.load(html);
      // console.log("html : ", html);
      console.log("Response : ", response);
      let city = cities_arr[cities_num];

      // get all emails on page in an array
      let emails_arr = $('.email').map(() => {
         return $(this).text();
      }).get();

      if (cities_num == 0) {
        console.log("emails_arr : ", emails_arr);
      }

      // add objects to emails_arr
      let len = emails_arr.length;
      for (let i = 0; i < len; i++) {
        let obj = { email: emails_arr[i], city: city, state: "IL", email_attempts: 0, has_responded: false, has_matched: false, requested_off: false };
        documents_arr.push(obj);
      }

      // reached the last page
      if (len < 490) {
        console.log("less than 490 : ", cities_arr[cities_num]);
        console.log("page_num : ", page_num_city);
        if (cities_num < cities_arr.length - 1) {
          cities_num++;
        }
        else {
          let filename = "IL_emails_" + city + "_" + file_num;
          fs.writeFileSync(filename, documents_arr);
          documents_arr = [];
          return;
        }
        page_num_city = 1;
      }

      // write file only after array reaches 9,000 length
      if (documents_arr.length >= 9000) {
        let filename = "IL_emails_" + city + "_" + file_num;
        fs.writeFileSync(filename, documents_arr);
        documents_arr = [];
        file_num++;
      };
      scrape();
    });

  }
  else { // (page_num_main % 5 == 0) { // switch back to page_num_city
    page_num_main++;
    url = "http://publicemailrecords.com?page=" + page_num_main;
    request(url, (err, response, html) => {
      if (err) {
        console.log("err : ", err);
        return;
      }

      if (page_num_main % 5 == 0) {
        page_num_city++;
        page_num_main = 5;
      }
      scrape();
    })
  }
}

app.get("/", async (req, res) => {
  console.log("home")

  await scrape();

  console.log("home2");
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

app.listen(process.env.PORT || 3000);

exports = module.exports = app;
