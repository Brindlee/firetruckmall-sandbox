var pgFilter = {};
var isPgFilterApply = false;
var totalPageNo = 0;
var isPrevious = false;
var isIndexPage = false;
var searchTerm = '';
var sandboxServiceUrl = 'https://partial-firetruckmall.cs29.force.com/services/apexrest/';
var productionServiceUrl = 'https://www.firetruckmall.com/services/apexrest/';
var head = document.getElementsByTagName('head')[0];
/* Inject external script library for making support of Promise in IE */
var script = document.createElement('script');
script.type = 'text/javascript';
script.src = 'https://cdnjs.cloudflare.com/ajax/libs/bluebird/3.3.4/bluebird.min.js';
head.appendChild(script);

/* Javascript Map for Bind Truck Apparatus Type to respective public image path. */
var FT_truckTypeImageUrl = {
    'FooterBellImg':'https://brindlee--c.na78.content.force.com/servlet/servlet.ImageServer?id=0151N000003fIoK&oid=00Do0000000JLLE&lastMod=1499264854000',
    'Default' : 'https://c.na78.content.force.com/servlet/servlet.ImageServer?id=0151N000003exvn&oid=00Do0000000JLLE&lastMod=1497451382000',
    'All' : 'https://brindlee--c.na78.content.force.com/servlet/servlet.ImageServer?id=0151N000002Wht1&oid=00Do0000000JLLE&lastMod=1518725645000',
    'Rescue Pumpers and Engines' : 'https://brindlee--c.na78.content.force.com/servlet/servlet.ImageServer?id=0151N000002Whtz&oid=00Do0000000JLLE&lastMod=1518725917000',
    'Used Rescue Trucks and Squads' : 'https://c.na78.content.force.com/servlet/servlet.ImageServer?id=0151N000002WhuY&oid=00Do0000000JLLE&lastMod=1495568998000',
    'Used Aerials, Ladder Trucks and Quints' : 'https://brindlee--c.na78.content.force.com/servlet/servlet.ImageServer?id=0151N000002Whu9&oid=00Do0000000JLLE&lastMod=1518725963000',
    'Used Tankers and Tenders' : 'https://c.na78.content.force.com/servlet/servlet.ImageServer?id=0151N000002Whud&oid=00Do0000000JLLE&lastMod=1495569016000',
    'Ambulances and Transport Units' : 'https://c.na78.content.force.com/servlet/servlet.ImageServer?id=0151N000002WhtL&oid=00Do0000000JLLE&lastMod=1495568688000',
    'Used Brush Trucks, Quick Attacks & Minis' : 'https://c.na78.content.force.com/servlet/servlet.ImageServer?id=0151N000002WhuO&oid=00Do0000000JLLE&lastMod=1495568956000',
    'Used ARFF and Airport Crash Trucks' : 'https://c.na78.content.force.com/servlet/servlet.ImageServer?id=0151N000002WhuE&oid=00Do0000000JLLE&lastMod=1495568936000',
    'Towers and Platforms' : 'https://brindlee--c.na78.content.force.com/servlet/servlet.ImageServer?id=0151N000002Whtl&oid=00Do0000000JLLE&lastMod=1518725945000',
    'Command Units' : 'https://c.na78.content.force.com/servlet/servlet.ImageServer?id=0151N000002WhtQ&oid=00Do0000000JLLE&lastMod=1495568717000',
    'Loose and Miscellaneous Equipment' : 'https://c.na78.content.force.com/servlet/servlet.ImageServer?id=0151N000002Whtp&oid=00Do0000000JLLE&lastMod=1495568834000',
    'European Style Units' : 'https://c.na78.content.force.com/servlet/servlet.ImageServer?id=0151N000002Whtf&oid=00Do0000000JLLE&lastMod=1495568815000',
    'Pacific Rim Style Fire Apparatus' : 'https://c.na78.content.force.com/servlet/servlet.ImageServer?id=0151N000002Whtu&oid=00Do0000000JLLE&lastMod=1495568856000',
    'Vocational Trucks' : 'https://c.na78.content.force.com/servlet/servlet.ImageServer?id=0151N000002Whun&oid=00Do0000000JLLE&lastMod=1495569042000',
    'Used Pumpers and Engines' : 'https://brindlee--c.na78.content.force.com/servlet/servlet.ImageServer?id=0151N000002WhuT&oid=00Do0000000JLLE&lastMod=1518725976000',
    'Demoand Refurb Units' : 'https://c.na78.content.force.com/servlet/servlet.ImageServer?id=0151N000002Whta&oid=00Do0000000JLLE&lastMod=1495568791000',
};

var FT_translatableStrings = {

    "footerSellingTxt1" : "Selling A Used Fire Truck?",
    "footerSellingTxt2" : "click here for more information",
    "footerPoweredByTxt" : "Powered by the Fire Truck Finder",
    "footerCallusText" : "Call us at dealerPhone or",
    "footerTruckFinderText" : "Can't Find What You're Looking For?",
    "headerDescription" : "Welcome to the used truck portion of our site. Please use Fire Truck Finder below to search our database for used trucks. Send an inquiry form a truck below with questions, or call us at dealerPhone",
    "mainPageTitle" : "Shop Our Used Fire Trucks",
    "paginationNextText" : "Next",
    "paginationPrevText" : "Previous",
    "viewDetailsBtnText" : "View Details",
    "descriptionTabText" : "DESCRIPTION",
    "inquiryTabText" : "YES I&#39;M INTERESTED",
    "shareLinkTabText" : "LINK TO SHARE",
    "copyBtnText" : "Copy",
    "inquiryLinkText1" : "click",
    "inquiryLinkText2" : "here",
    "inquiryLinkText3" : "to inquire about this truck",
    "contactUsText" : "Send your questions below, or call us at dealerPhone for more info on this fire truck",
    "pageTitleStart" : "Shop Our ",
    "allCatText" : "Used Fire Trucks",
    "paginationText1" : "Page",
    "paginationText2" : "of",
    "backToCatPageText" : "Return To Categories",
    "backToTrucksPageText" : "Return To Truck List",
    "backToTrucksSearchText":"Return To Search List",
    "sellFormTitle" : "Let us know a little about your Fire Truck, and we will be in touch!",
    "truckFinderFormTitle" : "Take 30 seconds to fill out the form below, and get immediate updates when a truck meeting your Department's needs is listed!",
    "requiredErrormsg" : "Please Fill All Required Fields!",
    "invalidPhoneError" : "Invalid Phone!",
    "invalidEmailError" : "Invalid Email!",
    "sellFormSubmitText" : "Submit",
    "truckFinderSubmitText" : "Find",
    "sellFormSuccessMsg" : "Thank you for the opportunity to sell your truck.  A member of our team will be in touch with you as soon as possible to answer your questions.",
    "truckFinderFormSuccessMsg" : "Thank you for submitting your search request. A member of our team will be in touch with you as soon as possible.",
    "formErrorMsgPart1" : "We apologize for the error. Please contact",
    "formErrorMsgPart2" : "if the error persists.",
    "First Name" : "First Name",
    "Last Name" : "Last Name",
    "Fire Department" : "Fire Department",
    "Email" : "Email",
    "Phone" : "Phone",
    "State" : "State",
    "What year is your truck" : "What year is your truck",
    "What type of truck" : "What type of truck",
    "What brand is your truck" : "What brand is your truck",
    "When would you like to sell your truck" : "When would you like to sell your truck",
    "What price is needed for your truck" : "What price is needed for your truck",
    "Comments" : "Comments",
    "enquiryFormSubmitTxt" : "Submit Fire Truck Inquiry",
    "Purchase Timeframe" : "Purchase Timeframe",
    "City" : "City",
    "FD or Company" : "FD or Company",
    "Inquiry Message" : "Inquiry Message",
    "inquiryFormSuccessMsg" : "Your Request Has Been Submited Successfully!",
    "loaderText" : "We are finding your fire truck",
    "serverErrorMessage" : "Something went wrong..",
    "notFoundError" : "Truck not found",
    "noRecordsMessage" : "No categories found",
    "pricingTxt" : "Call For Custom Quote",
    "hodTxt" : "Held on Deposit",
    "detailPageCallusText" : "or call us at dealerPhone for more info",
    "Fire Dept's Website" : "Fire Dept's Website",
    "Phone Number" : "Phone Number",
    "Fire Dept State/Province" : "Fire Dept State/Province",
    "Fire Dept City" : "Fire Dept City",
    "Email Address" : "Email Address",
    "Apparatus Type" : "Apparatus Type",
    "Mileage" : "Mileage",
    "Year Min" : "Year Min",
    "Year Max" : "Year Max",
    "Budget Min" : "Budget Min",
    "Budget Max" : "Budget Max",
    "Chassis" : "Chassis",
    "Warranty" : "Warranty",
    "Pump Size" : "Pump Size",
    "Tank Size" : "Tank Size",
    "Brands" : "Brands",
    "Geographic Region" : "Geographic Region",
    "searchNoResultsMsgPart1" : "Your search for",
    "searchNoResultsMsgPart2" : "did not match any trucks"
};

/* Javascript Map for Bind Truck Details(HTML) Abstract content dynamically with respective field data of truck. */
var FT_GlobalFieldToStrHTML = {
    VF_Main_Title__c : '<h1 class="FT_title">{0}</h1>',
    VF_Website_Price__c : '<h2 class="FT_heading" style="color:{0}">{1} - {3} <a href="javascript:void(0)" onclick="{2}">{4}</a> {5} <span class="FT_callustxt" style="display:{7};">{6}</span></h2> ',
    Cloud_Documents__r : ''
}

/* Javascript Map for Bind Truck Mini-Details(HTML) Top content dynamically with respective field data of truck. */
var FT_MiniDetailFieldToStrHTML = {
    VF_Main_Title__c : '<div class="FT_redTxt" style="color:{0}">{1}</div>',
    Description : '<div class="FT_gryTxt">{0}</div>',
    Stock_Number__c: '<div class="FT_gryTxt">Stock # {0}</div>',   
    VF_Additional_Pricing_Text__c: '<div class="FT_gryTxt">{0}</div>',
    Description:'<div class="FT_gryTxt">{0}</div>'
}

/* Javascript Map for Bind Truck Mini-Details(HTML) bottom content dynamically with respective field data of truck. */
var FT_MiniDetailBottomFieldsToStrHTML = {
    //VF_Additional_Pricing_Text__c : '<div>{0}</div>',
    VF_Website_Price__c : '<div class="FT_blackCost">{0}</div>'
}

// this Map values changes as per Dealer website theam.
var FT_ThemeProperties = {
    background : '',
    color : ''
}

// this Map value will set as per URL parametrs value.
var FT_URLParam = {
    stockno : '',
    category : ''
}

/* Javascript Map for Bind Truck Details(HTML) Tab content dynamically with respective field data of truck. */
var FT_DetailFieldToStrHTML = {
    'Stock_Number__c' : '<div class="FT_redTxt FT_bigTxt" style="color:{0}">Stock # {1}</div>',
    'Description' : '{0}<br/>',
    'VF_Main_Title__c' : '<div>{0}</div>',
    'VF_Chassis__c' : '{0}<br/>',
    'VF_Seating__c' : '{0}<br/>',
    'Fire_Truck__r.Additional_Chassis_Info__c' : '{0}<br/>',
    'Fire_Truck__r.Additional_Fire_Body_Info__c' : '{0}<br/>',
    'VF_Engine__c' : '{0}<br/>',
    'VF_Transmission_Description__c' : '{0}<br/>',
    'VF_Engine_Brake__c' : '{0}<br/>',
    'Fire_Truck__r.Additional_Engine_Info__c' : '{0}<br/>',
    'VF_Pump__c' : '{0}<br/>',
    'VF_Current_Annual_Pump_Service_Test__c' : '{0}<br/>',
    'VF_Water_Tank__c' : '{0}<br/>',
    'VF_Foam_System__c' : '{0}<br/>',
    'VF_Foam_Tank_1__c' : '{0}<br/>',
    'VF_Foam_Tank_2__c' : '{0}<br/>',
    'Fire_Truck__r.Additional_Pump_Info__c' : '{0}<br/>',
    'VF_Drivers_Side_Discharges__c' : '{0}<br/>',
    'VF_Drivers_Side_Suction__c' : '{0}<br/>',
    'VF_Officers_Side_Discharges__c' : '{0}<br/>',
    'VF_Officers_Side_Suction__c' : '{0}<br/>',
    'VF_Front_Discharges__c' : '{0}<br/>',
    'VF_Front_Suction__c' : '{0}<br/>',
    'VF_Rear_Discharges__c' : '{0}<br/>',
    'VF_Rear_Suction__c' : '{0}<br/>',
    'FT_Deck_Gun__c' : '{0}<br/>',
    'Fire_Truck__r.Additional_Plumbing_Info__c' : '{0}<br/>',
    'VF_Booster_Reel__c' : '{0}<br/>',
    'VF_Crosslays_Speedlays__c' : '{0}<br/>',
    'VF_Monitor_Description__c' : '{0}<br/>',
    'VF_Generator_Description__c' : '{0}<br/>',
    'VF_Lighting_Description__c' : '{0}<br/>',
    'VF_Heated_Mirrors__c' : '{0}<br/>',
    'VF_Hard_Suction__c' : '{0}<br/>',
    'VF_Electric_Reels__c' : '{0}<br/>',
    'VF_Hydraulic_Reels__c' : '{0}<br/>',
    'VF_Air_Reels__c' : '{0}<br/>',
    'VF_Electronic_Siren__c' : '{0}<br/>',
    'Fire_Truck__r.Additional_Electrical_Info__c' : '{0}<br/>',
    'VF_Cascade_System__c' : '{0}<br/>',
    'VF_Breathing_Air__c' : '{0}<br/>',         
    'VF_Air_Conditioning__c' : '{0}<br/>',
    'VF_Hydraulic_Ladder_Rack__c' : '{0}<br/>',
    'VF_Aluminum_Hose_Bed_Cover__c' : '{0}<br/>',
    'VF_Automatic_Tire_Chains__c' : '{0}<br/>',
    'VF_Pump_Heat_Pan__c' : '{0}<br/>',
    'VF_Backup_Camera__c' : '{0}<br/>',
    'VF_Federal_Q2B_Siren__c' : '{0}<br/>',
    'FT_Ground_Ladders__c' : '{0}<br/>',
    'VF_Auto_Lube_System__c' : '{0}<br/>',
    'Fire_Truck__r.Additional_Features__c' : '{0}<br/>',
    'VF_Pump_Hours__c' : '{0}<br/>',
    'VF_Engine_Hours__c' : '{0}<br/>',
    'VF_Arrowstick_Traffic_Indicator__c' : '{0}<br/>',
    'VF_LED_Lighting__c' : '{0}<br/>',
    'VF_Light_Tower__c' : '{0}<br/>',
    'VF_Telescoping_Lights__c' : '{0}<br/>',
    'Fire_Truck__r.Additional_Lighting_Info__c' : '{0}<br/>',
    'VF_Current_Aerial_Certification__c' : '{0}<br/>',
    'Fire_Truck__r.Aerial_Info__c' : '{0}<br/>',
    'FT_Aerial_Hours__c' : '{0}<br/>',
    'VF_Mileage__c' : '{0}<br/>',
    'Loose_Equipment_Included__c' : '{0}<br/>',
    'VF_Break_Text_1__c' : '{0}<br/>',
    'VF_OAL__c' : '{0}<br/>',
    'VF_OAH__c' : '{0}<br/>',
    'VF_OAW__c' : '{0}<br/>',
    'VF_GVRW__c' : '{0}<br/>',
    'VF_Wheelbase__c' : '{0}<br/>',
    'Additional_Dimension_Info__c' : '{0}<br/>'
};

/* Javascript global variable for Bind footer element on page. */
var FT_PageFooterStrHTML = '<div class="FT_footer" style="background:{0}">' +
                           '    <img src="'+FT_truckTypeImageUrl['FooterBellImg']+'" class="FT_imgfL"/>'+
                           '    <img src="'+FT_truckTypeImageUrl['FooterBellImg']+'" class="FT_imgfR"/>'+
                            '<div class="FT_clr"></div>'+
                            '<div class="FT_fR">'+
                           '    <h5 style="color:{1}" class="FT_footerHead">{3}</h5>' +
                           '    <div class="FT_footerinner"><span style="color:{1}; display: {7}">{6} </span> <a href="javascript:void(0)" onclick="showSellModal()" style="color:{2}">{4}</a></div>' +
                            '</div>'+
                            '<div class="FT_fL">'+
                            '    <h5 style="color:{1}" class="FT_footerHead">{8}</h5>' +
                           '    <div class="FT_footerinner"><a href="javascript:void(0)" onclick="FT_showTruckFinderModal()" style="color:{2}">{4}</a></div>' +
                           '</div>'+
                        '<div class="FT_clr"></div>'+
                            '    <div class="FT_regtext" style="color:{2}; margin-top:15px;">{5}' +
                           '        <div class="FT_regmark" style="color:{2}">&#174;</div>' +
                           '    </div>' +
                           '</div>';
var FT_LoaderHtml = '<div class="FT_container FT_loaderContainer"><div class="bgBlack FT_loader" id="FT_loader"><div class="whtieBg"><div class="loader" style="border-top: 4px solid {0}"></div></div><p class="FT_loaderText">{1}</p></div></div>';

var FT_SearchLoaderHtml = '<div class="searchButton loaderDiv"><div class="loader" style="border-top: 4px solid {0}"></div></div>';

/* Javascript variables contains CSS class in string format to for add to page. */
var FT_DynamicTabCSS = 'li.FT_active a, li.FT_active a:hover { background: {0}; color: {1}; }'
var FT_DynamicNxtBtnCSS = 'a.FT_swiperBtn.FT_nextBtn:before { content: ""; border: solid {0}; border-width: 0 3px 3px 0; position: absolute; border-radius: 3px; left: 10px;';
var FT_DynamicPrvBtnCSS = 'a.FT_swiperBtn.FT_prevBtn:before { content: ""; border: solid {0}; border-width: 0 3px 3px 0; position: absolute; border-radius: 3px; left: 10px;';

var FT_BMFA_TruckContainer;
var FT_lastCategorySelected;
var FT_lastTruckSelected;
var FT_isLocalStorageSupport = (typeof(Storage) !== "undefined");
var FT_defaultTruckImageKey = 'Default';
var FT_tab1Id = 'descriptionTab';
var FT_tab2Id = 'inquiryTab';
var FT_tab3Id = 'shareLinkTab';
var FT_emailRegex =  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
var FT_phoneRegex =  /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;
var FT_currencyRegex = /[\$]?([0-9,])*[\.][0-9]{2}/;
var FT_DealerAccointId = ''; // this value changes as per Dealer.
var FT_TruckId;
var isSandbox = false;
var pageNumber = 1;
var pageSize = 10;

var navigatedFromCategories = false;
var swiperLargeImageList = [];
var isDisplayTruckPricing = true;
var dealerPhoneNumber = '';
var isDisplayDealerPhone = false;
var languageCode = 'en';
var FT_truckTypeMap;
var FT_categoryMap;
var FT_catTruckCountMap;
var FT_dataToTranslate = [];            
var apiServiceBaseLink = 'https://www.firetruckapi.com/api/';
var translationApiLink = apiServiceBaseLink+'Translation';
var FT_translatableFields = [ "Name", "VF_Main_Title__c", "Description", "VF_Additional_Pricing_Text__c", "VF_Website_Price__c", "detailBtnText", "VF_Chassis__c", "VF_Seating__c", "VF_Engine__c", "VF_Transmission_Description__c", "VF_Engine_Brake__c", "VF_Pump__c", "VF_Current_Annual_Pump_Service_Test__c", "VF_Water_Tank__c", "VF_Foam_System__c", "VF_Foam_Tank_1__c", "VF_Foam_Tank_2__c", "VF_Drivers_Side_Discharges__c", "VF_Drivers_Side_Suction__c", "VF_Officers_Side_Discharges__c", "VF_Officers_Side_Suction__c", "VF_Front_Discharges__c", "VF_Front_Suction__c", "VF_Rear_Discharges__c", "VF_Rear_Suction__c", "FT_Deck_Gun__c", "VF_Booster_Reel__c", "VF_Crosslays_Speedlays__c", "VF_Monitor_Description__c", "VF_Generator_Description__c", "VF_Lighting_Description__c", "VF_Heated_Mirrors__c", "VF_Hard_Suction__c", "VF_Electric_Reels__c", "VF_Hydraulic_Reels__c", "VF_Air_Reels__c", "VF_Electronic_Siren__c", "VF_Cascade_System__c", "VF_Breathing_Air__c", "VF_Air_Conditioning__c", "VF_Hydraulic_Ladder_Rack__c", "VF_Aluminum_Hose_Bed_Cover__c", "VF_Automatic_Tire_Chains__c", "VF_Pump_Heat_Pan__c", "VF_Backup_Camera__c", "VF_Federal_Q2B_Siren__c", "FT_Ground_Ladders__c", "VF_Auto_Lube_System__c", "VF_Pump_Hours__c", "VF_Engine_Hours__c", "VF_Arrowstick_Traffic_Indicator__c", "VF_LED_Lighting__c", "VF_Light_Tower__c", "VF_Telescoping_Lights__c", "VF_Current_Aerial_Certification__c", "FT_Aerial_Hours__c", "VF_Mileage__c", "Loose_Equipment_Included__c", "VF_Break_Text_1__c", "VF_OAL__c", "VF_OAH__c", "VF_OAW__c", "VF_GVRW__c", "VF_Wheelbase__c", "Additional_Dimension_Info__c", "Additional_Chassis_Info__c", "Additional_Fire_Body_Info__c", "Additional_Engine_Info__c", "Additional_Pump_Info__c", "Additional_Plumbing_Info__c", "Additional_Electrical_Info__c", "Additional_Features__c", "Additional_Lighting_Info__c", "Aerial_Info__c" ];
var dbFetchError = false;
var FT_isFetchedPageSize = false;
var FT_isFetchedTranslations = false;
var globalAccountRecord;
var distinctFilters = null;
/* A javascript Class Module for API requests. */
var FT_WebRequestHandler = {
    getWebRequestInstance : function() {
        var xhttp = null;
        if ( window.XMLHttpRequest ) {
            // code for modern browsers
            xhttp = new XMLHttpRequest();
        } else if( window.ActiveXObject ) {
            // code for old IE browsers
            xhttp = new ActiveXObject("Microsoft.XMLHTTP");
        } else {
            console.log('Your Browser Does Not Support Web-Request!');
            return xhttp;
        }
        return xhttp;
    },          
    getRequest : function( callback, serviceUrl ) {
        xhttp = this.getWebRequestInstance();
        if(xhttp) {
            
            var getUrl = apiServiceBaseLink+"trucks?accountId=" + FT_DealerAccointId + "&isSandbox="+isSandbox;
            if( serviceUrl ) {
                getUrl = serviceUrl;
            }
            xhttp.open("GET", getUrl, true);
             
            xhttp.setRequestHeader("Authorization", "Basic ZnNtLWFkbWluOjhlZDMxMmM4NTE0ZDRhMDI3OWFjOTBjNTQxOGEwOGQ5");
            xhttp.send();
            xhttp.onreadystatechange = function() {
                callback(this);
            };
        }
    },      
    getPageRequest : function(callback, additionalParams) {
        if( typeof additionalParams['cat'] != 'undefined' ) var categoryName = additionalParams['cat'];
        if( typeof additionalParams['pageNum'] != 'undefined' ) var pageNumber = additionalParams['pageNum'];
        if( typeof additionalParams['stockn'] != 'undefined' ) var stockno = additionalParams['stockn'];
        xhttp = this.getWebRequestInstance();
        if(xhttp) {
            
            if( typeof stockno != 'undefined' ) {       
                var reqURL = apiServiceBaseLink+"BMFAServices?accountId=" + FT_DealerAccointId + "&isSandbox="+isSandbox+"&Category="+encodeURIComponent(categoryName)+"&Stockno="+stockno;
                xhttp.open("GET", reqURL, true);
            } else {
                var reqURL = apiServiceBaseLink+"BMFAServices?accountId=" + FT_DealerAccointId + "&isSandbox="+isSandbox+"&Category="+encodeURIComponent(categoryName)+"&Page="+pageNumber+"&PageSize="+pageSize;
                xhttp.open("GET", reqURL, true);
            }
            xhttp.setRequestHeader("Authorization", "Basic ZnNtLWFkbWluOjhlZDMxMmM4NTE0ZDRhMDI3OWFjOTBjNTQxOGEwOGQ5");
            xhttp.send();
            xhttp.onreadystatechange = function() {
                callback(this, additionalParams);
            };
        }
    },  
    postRequest : function(payload, callback) {
        xhttp = this.getWebRequestInstance();
        if(xhttp) {
            xhttp.open("POST", apiServiceBaseLink+"services?isSandbox="+isSandbox, true);
            xhttp.setRequestHeader("Authorization", "Basic ZnNtLWFkbWluOjhlZDMxMmM4NTE0ZDRhMDI3OWFjOTBjNTQxOGEwOGQ5");
            xhttp.send(payload);
            xhttp.onreadystatechange = function() {
                callback(this);
            };
        }
    },
    postRequestCustom : function( payload, url, callback, additionalParams ) {
        xhttp = this.getWebRequestInstance();
        if(xhttp) {
            xhttp.open("POST", url , true);
            xhttp.setRequestHeader("Authorization", "Basic ZnNtLWFkbWluOjhlZDMxMmM4NTE0ZDRhMDI3OWFjOTBjNTQxOGEwOGQ5");
            xhttp.setRequestHeader('Content-Type', 'application/json');
            xhttp.send(payload);
            xhttp.onreadystatechange = function() {
                callback( this, additionalParams);
            };
        }
    }
}

/* Check if indexedDb is supported by browser 
* if yes then create db and objectStore for caching the data */
var FT_idbSupported = false;
var FT_idxDb;
var FT_isIndexedDbCreated = false;
function FT_clearIndexedDb( dbName ) {
    var promise = new Promise( function( resolve, reject ) {
        var openRequest = indexedDB.open( dbName ); 
        openRequest.onupgradeneeded = function(e) {
            var thisDB = e.target.result;
        }    
        openRequest.onsuccess = function(e) {
            FT_idxDb = e.target.result;
            FT_isIndexedDbCreated = true;
            /*Check if indexedDB FT_categoryMapKey exists : if not f,ech data from server else from cache*/                  
            var transaction = FT_idxDb.transaction(["FT_trucks"],"readwrite");
            if( transaction ) {
                var objectStore = transaction.objectStore("FT_trucks");
                var clearRequest = objectStore.clear();
                clearRequest.onsuccess = function(event) {
                    resolve(true);
                };
            }
        }
    });
    return promise;
}
function FT_reinitializeIndexedDb() {
    var accountId = document.getElementById('dealerTruckContainerId').getAttribute('accountId');
    //create accountId specific detabases so that cache can maintained per account
    var dbName = (accountId) ? "FT_trucksDb_"+accountId : "FT_trucksDb"; 
    var promise = new Promise( function( resolve, reject ) {
        FT_clearIndexedDb( dbName ).then( 
            function(isDeleted) {
                if( isDeleted ) {
                    var openRequest = indexedDB.open(dbName);   
                    openRequest.onupgradeneeded = function(e) {
                        var thisDB = e.target.result;    
                        if(!thisDB.objectStoreNames.contains("FT_trucks")) {
                            thisDB.createObjectStore("FT_trucks");
                        }    
                    }    
                    openRequest.onsuccess = function(e) {
                        FT_idxDb = e.target.result;
                        FT_isIndexedDbCreated = true;
                        /* Create FT_trucks objectstore */                  
                        var transaction = FT_idxDb.transaction(["FT_trucks"],"readwrite");
                        if( transaction ) {
                            var objectStore = transaction.objectStore("FT_trucks");
                            resolve(true);
                        } else {
                            reject('Error while creating indexed db for cache');
                        }
                    }
                }
            }, function(error) {
                console.log(error);
                reject(error);
            }
        );
    });
    return promise;     
}

/* Method for clear DOM. */
var FT_clearContainerDom = function() {
    while (FT_BMFA_TruckContainer.hasChildNodes()) {
        FT_BMFA_TruckContainer.removeChild(FT_BMFA_TruckContainer.lastChild);
    }
}

/* Function to scroll window at position where truck container starts */
var FT_scrollTop = function() {
    setTimeout(function () {
        window.scrollTo(0, (FT_BMFA_TruckContainer.offsetTop-10));
        if( document.body.scrollTo )
            document.body.scrollTo(0, (FT_BMFA_TruckContainer.offsetTop-10));
    },2);   
}

function FT_setAttributes( el, attrs ) {
    for(var key in attrs) {
        el.setAttribute(key, attrs[key]);
    }
}

/* This is the String format function. */
String.prototype.FT_format = function (args) {
    var str = this;
    return str.replace(String.prototype.FT_format.regex, function(item) {
        var intVal = parseInt(item.substring(1, item.length - 1));
        var replace;
        if (intVal >= 0) {
            replace = args[intVal];
        } else if (intVal === -1) {
            replace = "{";
        } else if (intVal === -2) {
            replace = "}";
        } else {
            replace = "";
        }
        return replace;
    });
};
String.prototype.FT_format.regex = new RegExp("{-?[0-9]+}", "g");

/* A function for add Footer element. 
 * @Param parent    : hold parent element where footer will be added.
 */
var FT_addPageFooter = function(parent) {
    var isDisplayFooterCallusText = ( isDisplayDealerPhone ) ? 'inline-block' : 'none';
    var FooterStrHtml = FT_PageFooterStrHTML.FT_format([FT_ThemeProperties.background, FT_ThemeProperties.color, FT_ThemeProperties.color, FT_translatableStrings['footerSellingTxt1'], FT_translatableStrings['footerSellingTxt2'], FT_translatableStrings['footerPoweredByTxt'], FT_translatableStrings['footerCallusText'], isDisplayFooterCallusText, FT_translatableStrings['footerTruckFinderText'] ]);
    var div = document.createElement('div');
    div.innerHTML = FooterStrHtml;
    /* create a modal for sell form and append to footer */
    createModal( div, 'FT_sellModal', FT_addSellForm );

    /* create a modal for truck finder form and append to footer */
    createModal( div, 'FT_truckFinderModal', FT_addTruckFinderFrom );
    
    parent.appendChild(div);

    //add search filter and modal on each page as footer is added in each page
    FT_getDistinctFilters( parent );
}

/* A function bind click events on DOM elements. 
 * @Param callback  : holding a function that will class after click event occured.
 * @Param elements  : holding a list of elements that has to bind with click event.
 */
var FT_bindEvent = function(eventToBind, callback, elements) {
    for (var i = 0; i < elements.length; i++) {
        elements[i].addEventListener(eventToBind, function(event) {
            callback(event.target);
        });
    }
}

/* A function for display all possible categories. 
 * @Param categoryMap   : holding category names and it's truck count
 */
var FT_displayCategories = function(categoryMap) {
    //add history
    if(history.state === null || (history.state !== null && history.state.page !== undefined && history.state.page != 'categoryListing' )) {
        history.pushState({page:'categoryListing'}, null, null);
    }

    FT_clearContainerDom();
    var containerDiv = document.createElement('div');
    containerDiv.className = 'FT_container';

    //add header description text if display phone field is set to true
    if( isDisplayDealerPhone ) {
        var headerDesc = document.createElement('div');
        headerDesc.className = 'FT_headerdesc';
        headerDesc.innerHTML = FT_translatableStrings[ 'headerDescription' ];
        containerDiv.appendChild( headerDesc );
    }

    var titleDiv = document.createElement('div');
    titleDiv.className = 'FT_PageTitle';
    titleDiv.innerHTML = FT_translatableStrings['mainPageTitle'];

    containerDiv.appendChild(titleDiv);

    //add truckMsg to display "No results found" message if random search string added
    //containerDiv.appendChild(FT_truckMsg());
     
    // End Element to display filter options 
    containerDiv.appendChild( FT_prepareImageContainer(true, categoryMap, 'FT_category' , '', 1, '') );
    FT_BMFA_TruckContainer.appendChild(containerDiv);
    FT_addPageFooter(FT_BMFA_TruckContainer);
    //FT_bindEvent('click', FT_expandCategory, FT_BMFA_TruckContainer.querySelectorAll('img'));  
    FT_bindEvent('click', FT_expandCategory, FT_BMFA_TruckContainer.querySelectorAll('.FT_category img'));  
    
    /* Scroll to top at start of truck container div */
    if( !FT_isSafariOrIos() ) { //avoid scroll top for safari
        FT_scrollTop();
    }
}

FT_getDistinctFiltersCallback = function( xhttp,additionalParams ) {

    if (xhttp && xhttp.readyState == 4 && xhttp.status == 200) {

        var serverResponse = JSON.parse(xhttp.responseText);
        console.log('serverResponse: ',serverResponse);
        
        if( serverResponse.Success ) {

            var firstParse = JSON.parse( serverResponse.Data );
            if( FT_isJSON( firstParse ) ) {
                var serverData = JSON.parse( firstParse );
                console.log('serverData distinct: ', serverData);
                if (serverData.isSuccess) {

                    distinctFilters = serverData.ResponseMap;
                    FT_createSearchFilterElement( additionalParams );                               

                } else {
                    console.log( 'Error while fetching search filters: ', serverData.strMessage );
                    FT_callSiteDownAlertService( serverData.strMessage );
                }
                
            } else {
                console.log( 'Error: ',firstParse[0].message );
                FT_callSiteDownAlertService( firstParse[0].message );
            }
            
        } else {
            console.log( 'Server side error while fetching search filters: ',serverResponse.Message );
            FT_callSiteDownAlertService( serverResponse.Message );
        }
    }
}

function FT_getDistinctFilters( containerDiv ){
    var callbackAdditionalParams = { containerDiv : containerDiv };
    if( distinctFilters == null ){
        var filterObj = {
            accountId: FT_BMFA_TruckContainer.getAttribute('accountId')
        };
        var customURL = apiServiceBaseLink + "DistinctFilter?isSandbox="+isSandbox;
                
        FT_WebRequestHandler.postRequestCustom(JSON.stringify(filterObj), customURL, FT_getDistinctFiltersCallback, callbackAdditionalParams );
    } else {
        FT_createSearchFilterElement( callbackAdditionalParams );   
    }
}

var FT_removeOptionSelectedClass = function( e ) {
    if( e.target.id && document.getElementById( e.target.name ) ) {
        var options = document.getElementById( e.target.name ).options;
        for( var i = 0; i < options.length; i++ ) {
            options[i].classList.remove( 'selectedOpt' );
        }
    }
}

// Function to create filter input elements
function createFilterInputElements(name, type, typeAttribute){
    var element = document.createElement(type);
    if(typeAttribute){
        element.setAttribute('type', typeAttribute);
    }
    element.setAttribute('name', name);
    element.setAttribute( 'id', name );
    if(type == 'select'){
        if(distinctFilters){
            if(name == 'apparatusType' && distinctFilters['Apparatus Type'].length){
                for (var i = 0; i < distinctFilters['Apparatus Type'].length; i++) {
                    var opt = document.createElement('option');
                    opt.value = distinctFilters['Apparatus Type'][i];
                    opt.innerHTML = distinctFilters['Apparatus Type'][i];

                    if( pgFilter && pgFilter['ApparatusType'] && pgFilter['ApparatusType'].indexOf( opt.value ) !== -1 ){
                        opt.selected = true;
                    }
                    element.appendChild(opt);
                }
                //element.setAttribute('multiple', 'multiple');
            } else if (name == 'brand' && distinctFilters['Brand'].length) {
                for (var i = 0; i < distinctFilters['Brand'].length; i++) {
                    var opt = document.createElement('option');
                    opt.value = distinctFilters['Brand'][i];
                    opt.innerHTML = distinctFilters['Brand'][i];
                    
                    if( pgFilter && pgFilter['Brand'] && pgFilter['Brand'].indexOf( opt.value ) !== -1 ){
                        opt.className = 'selectedOpt';
                        opt.setAttribute('selected', 'selected');
                    }
                    element.appendChild(opt);
                }
                element.setAttribute('multiple', 'multiple');
                element.addEventListener( 'change', function(e) { FT_removeOptionSelectedClass(e) } );
            } else if (name == 'region' && distinctFilters['Geographic Region'].length) {
                for (var i = 0; i < distinctFilters['Geographic Region'].length; i++) {
                    var opt = document.createElement('option');
                    opt.value = distinctFilters['Geographic Region'][i];
                    opt.innerHTML = distinctFilters['Geographic Region'][i];

                    if( pgFilter && pgFilter['GeographicRegion'] && pgFilter['GeographicRegion'].indexOf( opt.value ) !== -1 ){
                        opt.className = 'selectedOpt';
                        opt.setAttribute('selected', 'selected');
                    }
                    element.appendChild(opt);
                }
                element.addEventListener( 'change', function(e) { FT_removeOptionSelectedClass(e) } );
                element.setAttribute('multiple', 'multiple');
            } else if (name == 'mileage' && distinctFilters['Mileage'].length) {
                for (var i = 0; i < distinctFilters['Mileage'].length; i++) {
                    var opt = document.createElement('option');
                    opt.value = distinctFilters['Mileage'][i];
                    opt.innerHTML = distinctFilters['Mileage'][i];
                    if( pgFilter && pgFilter['Mileage'] && pgFilter['Mileage'] == opt.value ){
                        opt.setAttribute( 'selected', 'selected' );
                    }
                    element.appendChild(opt);
                }
            }
        }
        
    } else if (type == 'input'){
        if (distinctFilters) {
            if ((name == 'budgetMin' || name == "budgetMax") && distinctFilters['Budget Range'].length){
                element.setAttribute('min', distinctFilters['Budget Range'][0]);
                element.setAttribute('max', distinctFilters['Budget Range'][1]);
                var budgetMinVal = '';
                var budgetMaxVal = '';
                if( pgFilter && pgFilter['BudgetRange'] ) {
                    let budgetRangeArr = pgFilter['BudgetRange'].split("-");
                    if( budgetRangeArr.length == 2 ) {
                        budgetMinVal = budgetRangeArr[ 0 ];
                        budgetMaxVal = budgetRangeArr[ 1 ];
                    }
                }
                if(name == 'budgetMin'){
                    element.setAttribute('placeholder', 'Min Budget');
                    element.value = budgetMinVal;
                }else{
                    element.setAttribute('placeholder', 'Max Budget');
                    element.value = budgetMaxVal;
                }
                element.setAttribute('onkeypress', 'return event.charCode >= 48 && event.charCode <= 57');
            }else if ((name == 'yearMin' || name == "yearMax") && distinctFilters['Year Range'].length) {
                element.setAttribute('min', distinctFilters['Year Range'][0]);
                element.setAttribute('max', distinctFilters['Year Range'][1]);
                element.setAttribute('onkeypress', 'return event.charCode >= 48 && event.charCode <= 57');
                var yearMinVal = '';
                var yearMaxVal = '';
                if( pgFilter && pgFilter['YearRange'] ) {
                    let yearRangeArr = pgFilter['YearRange'].split("-");
                    if( yearRangeArr.length == 2 ) {
                        yearMinVal = yearRangeArr[ 0 ];
                        yearMaxVal = yearRangeArr[ 1 ];
                    }
                }
                if(name == 'yearMin'){
                    element.setAttribute('placeholder', 'Min Year');
                    element.value = yearMinVal;
                }else{
                    element.setAttribute('placeholder', 'Max Year');
                    element.value = yearMaxVal;
                }
            }
        }
    }

    return element;
}
// Function to create filter dropdown
function FT_createSearchFilterElement( additionalParams ){
    var searchFilterContainer = document.createElement('div');
    searchFilterContainer.classList.add('filter-container');
    var searchFilterBodyStr = FT_getSerachFilterBodyStr();
    //searchFilterContainer.classList.add('form-inline');
    searchFilterContainer.innerHTML = searchFilterBodyStr.trim();

    if( additionalParams && additionalParams.containerDiv && distinctFilters ) {

        let containerDiv = additionalParams.containerDiv.querySelector('.FT_container');

        if( containerDiv ) {

            var innerContainer = containerDiv.querySelector('.FT_innerContainer');

            if( !containerDiv.querySelector('.filter-container') && innerContainer ) {

                containerDiv.insertBefore( searchFilterContainer, innerContainer );
                containerDiv.insertBefore( FT_truckMsg(), innerContainer );

                //attach key up event listner to search input for enter key form submission
                FT_searchOnEnterkey();

                if (document.getElementById('filterApparatusType')) {
                    document.getElementById('filterApparatusType').innerHTML = '';
                    document.getElementById('filterApparatusType').appendChild(createFilterInputElements('apparatusType', 'select', null));
                }
                if (document.getElementById('filterMileage')) {
                    document.getElementById('filterMileage').innerHTML = '';
                    document.getElementById('filterMileage').appendChild(createFilterInputElements('mileage', 'select', null));
                }
                if (document.getElementById('filterBrand')) {
                    document.getElementById('filterBrand').innerHTML = '';
                    document.getElementById('filterBrand').appendChild(createFilterInputElements('brand', 'select', null));
                }
                if (document.getElementById('filterRegion')) {
                    document.getElementById('filterRegion').innerHTML = '';
                    document.getElementById('filterRegion').appendChild(createFilterInputElements('region', 'select', null));
                }
                if (document.getElementById('filterBudgetRange')) {
                    document.getElementById('filterBudgetRange').innerHTML = '';
                    document.getElementById('filterBudgetRange').appendChild(createFilterInputElements('budgetMin', 'input', 'text'));
                    document.getElementById('filterBudgetRange').appendChild(createFilterInputElements('budgetMax', 'input', 'text'));
                }
                if (document.getElementById('filterYearRange')) {
                    document.getElementById('filterYearRange').innerHTML = '';
                    document.getElementById('filterYearRange').appendChild(createFilterInputElements('yearMin', 'input', 'text'));
                    document.getElementById('filterYearRange').appendChild(createFilterInputElements('yearMax', 'input', 'text'));
                }
            }
        }

    }
}

function FT_truckMsg(){
    var msgContainer = document.createElement('div');
    msgContainer.id = "truckMsg";
    msgContainer.class = "truckMsg";
    msgContainer.style.display = 'none';
    
    return msgContainer;
}

function FT_searchOnEnterkey(){

    var input = document.getElementById("searchinput");
    //avoid multiple times attaching event listner if already added
    if ( input.getAttribute('listener') !== 'true' ) {

        input.addEventListener("keyup", function(event) {

            if (event.keyCode === 13) {

                event.preventDefault();
                const elementClicked = event.target;
                elementClicked.setAttribute('listener', 'true');                
                FT_getFilterValues(event,false);
            }
        });
    }
}
function FT_openFilters(event){
    event.preventDefault();
    event.stopPropagation();
    document.getElementById("myDropdown").classList.toggle("showFilters");
}
function FT_closeFilterMenu(event){
    if( document.getElementById("myDropdown") != null ) {
        document.getElementById("myDropdown").classList.remove("showFilters");
    }
}
function minmax(value, min, max) {
    if (parseInt(value) < min || isNaN(parseInt(value)))
        return false;
    else if (parseInt(value) > max)
        return false;
    else return true;
}
function FT_getFilterValues(event, flag){
    var form = document.forms['filterForm'];
    var isValid = false;
        
    if(form.elements['budgetMin'] && minmax(form.elements['budgetMin'].value, form.elements['budgetMin'].getAttribute('min'), form.elements['yearMin'].getAttribute('max'))){
        isValid = true;
    }else if(form.elements['yearMin'] && minmax(form.elements['yearMin'].value, form.elements['yearMin'].getAttribute('min'), form.elements['yearMin'].getAttribute('max'))){
        isValid = true;
    } else if (form.elements['budgetMax'] && minmax(form.elements['budgetMax'].value, form.elements['budgetMax'].getAttribute('min'), form.elements['budgetMax'].getAttribute('max'))) {
        isValid = true;
    } else if (form.elements['yearMax'] && minmax(form.elements['yearMax'].value, form.elements['yearMax'].getAttribute('min'), form.elements['yearMax'].getAttribute('max'))) {
        isValid = true;
    }else if(!form.elements['yearMin'].value && !form.elements['yearMax'].value){
        isValid = true;
    } else if (!form.elements['budgetMin'].value && !form.elements['budgetMax'].value) {
        isValid = true;
    }
    if(!isValid && flag){
        console.log('Invalid input values.');
        return;
    }
    searchTerm = document.getElementById('searchinput').value;
    var filterObj={
        //ApparatusType : form.elements['apparatusType'].value,
        ApparatusType : getSelectValues(form.elements['apparatusType']),
        BudgetRange : form.elements['budgetMin'].value && form.elements['budgetMax'].value ? form.elements['budgetMin'].value+'-'+form.elements['budgetMax'].value : '',
        YearRange : form.elements['yearMin'].value && form.elements['yearMax'].value ? form.elements['yearMin'].value+'-'+form.elements['yearMax'].value : '',
        Mileage : form.elements['mileage'].value,
        Brand: getSelectValues(form.elements['brand']),
        GeographicRegion: getSelectValues(form.elements['region']),
        searchKey: searchTerm,
        isFilterApply : flag,
        accountId :  FT_BMFA_TruckContainer.getAttribute('accountId'),
        page : '1',
        PageSize : '8'
    };
    
    pgFilter = filterObj;
    isPgFilterApply = true;
    console.log('filterObj ::::',filterObj);
    //request search data from server
    FT_requestSearchTrucks( JSON.stringify(filterObj), false ); 
}

var FT_showSearchLoader = function() {
    let loaderDiv = FT_BMFA_TruckContainer.querySelector('div.searchButton.loaderDiv');
    let searchBtn = FT_BMFA_TruckContainer.querySelector('button.searchButton');
    if( loaderDiv && searchBtn ) {
        loaderDiv.style.display = 'block';
        searchBtn.style.display = 'none';
    }
}

var FT_hideSearchLoader = function() {
    let loaderDiv = FT_BMFA_TruckContainer.querySelector('div.searchButton.loaderDiv');
    let searchBtn = FT_BMFA_TruckContainer.querySelector('button.searchButton');
    if( loaderDiv && searchBtn ) {
        searchBtn.style.display = 'block';
        loaderDiv.style.display = 'none';
    }
}

var FT_requestSearchTrucks = function( strFilterData, fromBackButton ) {

    //show loader before requesting data from server
    /*FT_BMFA_TruckContainer.innerHTML = FT_LoaderHtml.FT_format([FT_ThemeProperties.background, FT_translatableStrings['loaderText']]);*/
    FT_showSearchLoader();
    var customURL = apiServiceBaseLink+"SearchTruck?isSandbox="+isSandbox;
    FT_WebRequestHandler.postRequestCustom( strFilterData, customURL, function (xhttp) {
        if (xhttp && xhttp.readyState == 4 && xhttp.status == 200) {
            var serverResponse = JSON.parse(xhttp.responseText);
            console.log('FT_requestSearchTrucks serverResponse: ',serverResponse);
            FT_hideSearchLoader();
            if( serverResponse.Success && serverResponse.Data ) {

                var firstParse = JSON.parse( serverResponse.Data );

                if( FT_isJSON( firstParse ) ) {

                    var serverData = JSON.parse( firstParse );
                    console.log('FT_requestSearchTrucks serverData: ', serverData);

                    if (serverData.isSuccess) {
                        FT_processPageTruckSearchData( serverResponse, fromBackButton );
                    } else {
                        FT_displayServerError( 'serverErrorMessage', 'Error occurred while performing search: '+serverData.strMessage );
                        console.log(serverData.strMessage);
                    }
                    
                } else {
                    FT_displayServerError( 'serverErrorMessage', 'Error occurred while performing search: '+firstParse[0].message );
                    console.log( 'Error: ',firstParse[0].message );
                }
                
            } else {
                FT_displayServerError( 'serverErrorMessage', 'Error occurred while performing search: '+serverResponse.Message );
                console.log( serverResponse.Message );
            }
        } else {
            if( xhttp.status != 200 ) {
                FT_hideSearchLoader();
                FT_displayServerError( 'serverErrorMessage', 'Error occurred while performing search with status code: '+ xhttp.status );
                console.log( 'SearchTruck service error with status code: ', xhttp.status );
            }
        }
    });
}

function getSelectValues(select) {
  var result = [];
  var options = select && select.options;
  var opt;

  for (var i=0, iLen=options.length; i<iLen; i++) {
    opt = options[i];

    if (opt.selected || opt.classList.contains( 'selectedOpt' ) ) {
      result.push(opt.value || opt.text);
    }
  }
  return result;
}


function FT_getSerachFilterBodyStr(){
    var searchFilterBody = '<div class="col search-col" style="max-width:unset!important;">'+
        '<div class="searchHeader"> <div id="searchbox" style="width:100%!important;">'+
        '<input placeholder="Search Trucks!" id="searchinput" value="'+searchTerm+'" />';
    searchFilterBody += FT_SearchLoaderHtml.FT_format( [ FT_ThemeProperties.background ] );
    searchFilterBody += '<button class="searchButton" type="button" onclick="FT_getFilterValues(event,false)"><img src="https://brindlee--c.na116.content.force.com/servlet/servlet.ImageServer?id=0153m000004z38A&oid=00Do0000000JLLE&lastMod=1572497390000" />'+
            '</button>'+
        '</div>'+
        '<div>'+
            '<button class="filterButton" id="filterButton" title="Filters" type="button" onclick="FT_openFilters(event)">'+
                '<img src="https://brindlee--c.na116.content.force.com/servlet/servlet.ImageServer?id=0153m000004z2C6&oid=00Do0000000JLLE&lastMod=1571936837000"/>'+        
            '</button>'+
        '</div> </div>'+
        '<div id="myDropdown" class="dropdown-content">'+
            '<form id="filterForm" action="#">'+
                '<div class="">'+
                    '<div class="form-inline gridForm"> <div class="col">'+
                            '<h4 class="filterTitle">Apparatus Type</h4>'+
                            '<div id="filterApparatusType" class="element-parent" style="width: 100%;"></div>'+
                        '</div>'+
                        '<div  class="col">'+
                            '<h4 class="filterTitle">Mileage</h4>'+
                            '<div id="filterMileage"  class="element-parent" style="width: 100%;"></div>'+
                        '</div>'+
                        '<div class="col">'+
                            '<h4 class="filterTitle">Budget Range</h4>'+
                            '<div id="filterBudgetRange"></div>'+
                        '</div>'+
                        '<div class="col">'+
                            '<h4 class="filterTitle">Brand</h4>'+
                            '<div id="filterBrand"  style="width: 100%;"></div>'+
                        '</div>'+
                        '<div class="col">'+
                            '<h4 class="filterTitle">Year Range</h4>'+
                            '<div id="filterYearRange"></div>'+
                        '</div>' +
                        '<div class="col">'+
                            '<h4 class="filterTitle">Geographic Region</h4>'+
                            '<div id="filterRegion" style="width: 100%;"></div>'+
                        '</div>'+
                        '<div class="col" style="width:100%;">' +
                            '<div class="btnDiv"><button type="button" onclick="FT_getFilterValues(event,true)">Show Fire Trucks</button>&nbsp;&nbsp;<button type="button" class="closeBtn" onclick="FT_closeFilterMenu(event)">Close</button></div>' +
                            '<div></div>' +
                        '</div>' +
                    '</div>'+
                '</div>'+
            '</form>'+
        '</div>'+
    '</div>';
    return searchFilterBody;
}
function FT_prepareCatTruckCountMap( categoryMap )  {
    FT_catTruckCountMap = [];
    for( var i = 0; i < categoryMap.length; i++ ) {
        if( languageCode && languageCode != 'en' && categoryMap[i].originalName ) {
            FT_catTruckCountMap[categoryMap[i].originalName] = categoryMap[i].Truck_Count__c;
        } else {
            FT_catTruckCountMap[categoryMap[i].Name] = categoryMap[i].Truck_Count__c;
        }
    }
    console.log('FT_catTruckCountMap:',FT_catTruckCountMap);
    return FT_catTruckCountMap; 
}

function FT_getCurrentTimeStamp() {
    if (!Date.now) {
        return new Date().getTime();
    } else {
        return Date.now();
    }
}

function FT_putCategoryMapInCache( categoryMap, isDisplayTruckPricing, languageCode ) {
    var dbError = false;
    if( FT_idbSupported ) {
        if( FT_isIndexedDbCreated ) {
            var transaction = FT_idxDb.transaction(["FT_trucks"],"readwrite");
            if( transaction ) {
                var store = transaction.objectStore("FT_trucks");
                if( store ) {
                    var request = store.put(categoryMap,'FT_categoryMapKey');
                    request.onerror = function(e) {
                        console.log("Error",e.target.error.name);
                        FT_callSiteDownAlertService( 'Error occurred while putting truck category data in browser cache: '+e.target.error.name );
                    }
                    request.onsuccess = function(e) {
                        //console.log("DB entry done!! stored in DB");
                        //save the timestamp at which data is been cached
                        var dataSavedTime = FT_getCurrentTimeStamp();
                        store.put(dataSavedTime,'FT_dataSavedTime');
                        store.put(isDisplayTruckPricing,'FT_isDisplayTruckPricing');    
                        store.put(languageCode,'FT_languageCode');                      
                    }
                } else 
                    dbError = true;
            } else 
                dbError = true;
        } else 
            dbError = true;
    }
    if( !FT_idbSupported || dbError ) {
        FT_WebRequestHandler.getRequest(FT_processTruckData);
    }
}

function FT_checkValidCategory( category ) {
    var isValidCat = false;
    for( var i = 0; i < FT_categoryMap.length; i++) {
        var checkWith = ( languageCode != 'en' ) ? FT_categoryMap[i].originalName : FT_categoryMap[i].Name;
        if( category == checkWith ) {
            isValidCat = true;
            break;
        }
    }
    return isValidCat;
}

function FT_getCatTranslatedName( originalCatName ) {
    var translatedCatName = originalCatName;
    if( FT_categoryMap && FT_categoryMap.length ) {
        for( var i = 0; i < FT_categoryMap.length; i++ ) {
            if( FT_categoryMap[i].originalName && FT_categoryMap[i].originalName == originalCatName ) {
                translatedCatName = FT_categoryMap[i].Name;
            }
        }
        //console.log( 'FT_categoryMap :::: ',FT_categoryMap );
    }
    return translatedCatName
}

function FT_processMainPage() {
    FT_prepareCatTruckCountMap( FT_categoryMap );
    if(FT_categoryMap.length) {
        if( FT_idbSupported ) {
            FT_putCategoryMapInCache( FT_categoryMap, isDisplayTruckPricing, languageCode );
        }
        if( FT_URLParam.category && !FT_URLParam.stockno ) {    
            var isCatValid = FT_checkValidCategory( decodeURIComponent( FT_URLParam.category ) );
            var cat = ( isCatValid ) ? decodeURIComponent( FT_URLParam.category ) : 'All';
            var div = document.createElement('div');
            var translatedCatName = FT_getCatTranslatedName( cat );             
            FT_setAttributes( div, { 'category' : cat, 'page' : 1, 'translatedCat' : translatedCatName } );
            FT_expandCategory( div );                                                   
        } 
        /* If URL has stock no in URL then display truck detail page */
        else if( FT_URLParam.stockno && !FT_lastTruckSelected ) {
            if(FT_URLParam.category) {      
                var isCatValid = FT_checkValidCategory( decodeURIComponent( FT_URLParam.category ) );
                var cat = ( isCatValid ) ? decodeURIComponent( FT_URLParam.category ) : 'All';
            } else {
                var cat = 'All';
            }
            var translatedCatName = FT_getCatTranslatedName( cat );
            //reinitialize indexedDB so that if pagesize is changed in HTML then all page cache should also be cleared 
            if( FT_idbSupported ) {
                FT_reinitializeIndexedDb().then( 
                    function() {
                        //refreash category truck count map
                        FT_WebRequestHandler.getRequest(FT_refreashTruckCountMap);
                        //show loader before requesting data from server
                        FT_BMFA_TruckContainer.innerHTML = FT_LoaderHtml.FT_format([FT_ThemeProperties.background, FT_translatableStrings['loaderText']]);
                        //set last selected category to all
                        var catDiv = document.createElement('div');
                        //catDiv.setAttribute('category',categoryName);
                        FT_setAttributes( catDiv, { 'category' : cat, 'page' : 1, 'translatedCat' : translatedCatName } );
                        FT_lastCategorySelected = catDiv;
                        //request data from server
                        var additionalParam = { cat : cat, pageNum: 1, stockn : FT_URLParam.stockno };
                        FT_WebRequestHandler.getPageRequest( FT_displayTruckDetails, additionalParam );
                    }, function( error ) {
                        console.log( error );
                        //else display first page
                        FT_loadCustomTruckData(false);  
                        FT_callSiteDownAlertService( 'Error occurred while fetching truck categories data: '+error );
                    }
                );
            } else {
                //refreash category truck count map
                FT_WebRequestHandler.getRequest(FT_refreashTruckCountMap);
                //show loader before requesting data from server
                FT_BMFA_TruckContainer.innerHTML = FT_LoaderHtml.FT_format([FT_ThemeProperties.background, FT_translatableStrings['loaderText']]);
                //set last selected category to all
                var catDiv = document.createElement('div');
                //catDiv.setAttribute('category',categoryName);
                FT_setAttributes( catDiv, { 'category' : cat, 'page' : 1, 'translatedCat' : translatedCatName } );
                FT_lastCategorySelected = catDiv;
                //request data from server
                var additionalParam = { cat : cat, pageNum: 1, stockn : FT_URLParam.stockno };
                FT_WebRequestHandler.getPageRequest( FT_displayTruckDetails, additionalParam );
            }
        }
        else {
            //added for history maintainance
            navigatedFromCategories = true;
            FT_displayCategories( FT_categoryMap );                         
        }   
    }               
}

function FT_putDataInCache( dataObj ) {
    if( FT_idbSupported && FT_isIndexedDbCreated) {
        var transaction = FT_idxDb.transaction(["FT_trucks"],"readwrite");
        if( transaction ) {
            var store = transaction.objectStore("FT_trucks");
            if( store ) {
                for( var key in dataObj ) {
                    var request = store.put( dataObj[ key ], key );
                    request.onerror = function(e) {
                        console.log("Error",e.target.error.name);
                        FT_callSiteDownAlertService( 'Error occurred while putting data in browser cache : '+e.target.error.name );
                    }
                    request.onsuccess = function(e) {
                        //console.log("DB entry done for "+key);                                            
                    }
                }                
            } 
        }   
    }
}

function FT_removeSpecialChars(str) {
    
    if(str){
      return str.replace(/(?!\w|\s)./g, '')
        .replace(/\s+/g, '_')
        .replace(/^(\s*)([\W\w]*)(\b\s*$)/g, '$2');
    }else{
        return '';
    }
}

function FT_PutPageTrucksInCache( trucks, pageNumber, categoryName ) {
    if( FT_idbSupported && FT_isIndexedDbCreated) {
        var transaction = FT_idxDb.transaction(["FT_trucks"],"readwrite");
        if( transaction ) {
            var store = transaction.objectStore("FT_trucks");
            if( store ) {
                var idxDbKey = FT_removeSpecialChars(categoryName);
                idxDbKey = idxDbKey+'_'+pageNumber;
                var request = store.put( trucks, idxDbKey );
                request.onerror = function(e) {
                    console.log("Error",e.target.error.name);
                    FT_callSiteDownAlertService( 'Error occurred while putting page trucks in browser cache: '+e.target.error.name );
                }
                request.onsuccess = function(e) {
                    //console.log("DB entry done!! stored in DB");                                          
                }
            } 
        }   
    }
}

/* A function handles click event on back button. 
 * @Param button    : button DOM-element. 
 */     
var FT_doBack = function(button) {
    if( navigatedFromCategories && !isPgFilterApply ) {
        navigatedFromCategories = false;
        history.back();
    } else {
        var toBackStr = button.getAttribute('jData');
        if(toBackStr === 'To Categories') {
            FT_displayCategories( FT_categoryMap );                 
        } else if(toBackStr === 'To Truck List') {
            if(isPgFilterApply){
                isIndexPage = true;
                FT_expandSearchCategory( FT_lastCategorySelected, true );
                //history.back();
            }else{
                FT_expandCategory(FT_lastCategorySelected);
            }
        }
    }
}

/* A function add back button to DOM. 
 * @Param toword    : holding string value that indicate where to go after back button clicked. 
 */
var FT_constructBackButton = function(toword) {
    var button = document.createElement('a');
    button.style.textAlign = "left";
    if( toword == 'To Categories' ) {
        button.innerText = '« '+FT_translatableStrings['backToCatPageText'];
    } else if( toword == 'To Truck List' ) {
        button.innerText = '« '+FT_translatableStrings['backToTrucksPageText'];
    } else if( toword == 'To Search List' ){
        button.innerText = '« ' + FT_translatableStrings['backToTrucksSearchText'];
    }
    else {
        button.innerText = '« Return ' + toword;
    }   
    button.className='FT_backLink';
    button.setAttribute('jData', toword);

    //add header description text if display phone field is set to true
    if( isDisplayDealerPhone ) {
        var headerDesc = document.createElement('div');
        headerDesc.className = 'FT_headerdesc';
        headerDesc.innerHTML = FT_translatableStrings[ 'headerDescription' ];
        FT_BMFA_TruckContainer.appendChild( headerDesc );
    }

    FT_BMFA_TruckContainer.appendChild( button );
    FT_bindEvent('click', FT_doBack, [button]);
}

/* A function for display images in container.
 * @Param isForCategory : A boolean used to indicate where container is for 
 *                        all category image fill or extended category image fill.
 * @Param truckDataList : A Map/List of truckes for display images on DOM
 * @translatedCatName : only passed if prepare image container for truck detail page
 */
var FT_prepareImageContainer = function( isForCategory, truckDataList, UICclass , categoryName, pageNumber, translatedCatName) {
    TruckImageContainer = document.createElement('div');
    TruckImageContainer.className += 'FT_container';
    var ul = document.createElement('ul');
    ul.className = 'FT_listStyle FT_innerContainer ' + UICclass;
    for(var truck in truckDataList) {
        if( truckDataList.hasOwnProperty( truck ) ) { //added to avoid iterating through object _proto properties
            if(truckDataList[truck] || isForCategory) {
                if( isForCategory ) {
                    var imgSrc = '';
                    if( typeof truckDataList[truck].Thumbnail_Image_Url__c != 'undefined' ) {
                        imgSrc = truckDataList[truck].Thumbnail_Image_Url__c;
                    } else {
                        if( languageCode != 'en' && truckDataList[truck].originalName ) {
                            imgSrc = FT_truckTypeImageUrl[truckDataList[truck].originalName];                        
                        } else {                        
                            imgSrc = FT_truckTypeImageUrl[truckDataList[truck].Name];                        
                        }
                    }
                }
                else {
                    var imgSrc = FT_truckTypeImageUrl[truck];
                }
                var li = document.createElement('li');
                var div = document.createElement('div');
                var img = document.createElement('img');
                
                if(isForCategory) {
                    var catDetailDiv = document.createElement('div');
                    catDetailDiv.innerHTML = truckDataList[truck].Name+ ' (' +truckDataList[truck].Truck_Count__c+ ')';
                    catDetailDiv.className = 'FT_redTxt';
                    catDetailDiv.style.color = FT_ThemeProperties.background;
                    if( languageCode && languageCode != 'en' &&  truckDataList[truck].originalName ) {
                        FT_setAttributes( img, { 'category' : truckDataList[truck].originalName, translatedcat: truckDataList[truck].Name, 'page' : 1 } );
                    } else {
                        FT_setAttributes( img, { 'category' : truckDataList[truck].Name, translatedcat: truckDataList[truck].Name, 'page' : 1 } );
                    }
                    if(!imgSrc) {       
                        //console.log(truck);
                    }
                    div.appendChild(img);
                    div.appendChild(catDetailDiv);
                } else {
                    
                    var idx = truck;
                    truck = truckDataList[truck];
                    FT_setAttributes( img, { 'truckid' : truck.Id, category : categoryName, page : pageNumber, index: idx, translatedcat: translatedCatName, Stock_No : truck.Stock_Number__c } );
                    //img.setAttribute('truckid', truck.Id); // Attribute to find truck(for Dev)
                    if(truck.Cloud_Documents__r && truck.Cloud_Documents__r.records.length) {
                        imgSrc = truck.Cloud_Documents__r.records[0].Amazon_S3_Image_URL__c; //Amazon_S3_Main_Thumbnail_URL__c
                        //check if main image is set for truck and if set take minimized image to display on trucks listing page
                        for( var k=0; k < truck.Cloud_Documents__r.records.length; k++ ) {
                            if( truck.Cloud_Documents__r.records[k].Main_Image__c ) {
                                imgSrc = truck.Cloud_Documents__r.records[k].Amazon_S3_Main_Thumbnail_URL__c;
                                break;
                            }
                        }
                    }
                    //Add loading text for lazy loading
                    var loadingSpan = document.createElement('span');
                    loadingSpan.setAttribute('class','FT_loadingImage');
                    loadingSpan.textContent = "Loading...";
                    div.appendChild(loadingSpan);
        
                    div.appendChild(img);
                    var miniDetailDiv = document.createElement('div');
                    var miniDetailHtml = '';
                    for(var field in FT_MiniDetailFieldToStrHTML) {
                        if(truck[field]) {
                            if('VF_Main_Title__c' === field) {
                                miniDetailHtml += FT_MiniDetailFieldToStrHTML[field].FT_format([FT_ThemeProperties.background, truck[field]]);
                            } else {
                                if( field == 'Stock_Number__c' ) {
                                    
                                    //console.log( 'globalAccountRecord: ', globalAccountRecord );
                                    if( globalAccountRecord && globalAccountRecord.Display_Stock_Number__c ) { //account record is returned by service and Display stock number filed is set
                                        if( globalAccountRecord.Display_Stock_Number__c == 'Brindlee' ) { //if set to brindlee then show Stock number field
                                            miniDetailHtml += FT_MiniDetailFieldToStrHTML[field].FT_format( [ truck[field] ] );
                                        } else if( globalAccountRecord.Display_Stock_Number__c == 'Dealer' ) { //if set to dealer and FTF_Dealer_Stock__c set then show FTF_Dealer_Stock__c field
                                            if( truck['FTF_Dealer_Stock__c'] ) {
                                                miniDetailHtml += FT_MiniDetailFieldToStrHTML[field].FT_format( [ truck['FTF_Dealer_Stock__c'] ] );
                                            }
                                        } 
                                    } 

                                    
                                } else {
                                    miniDetailHtml += FT_MiniDetailFieldToStrHTML[field].FT_format([truck[field]]);
                                }
                            }
                        }                   
                    }
                    miniDetailHtml += '<div class="FT_btmDiv">';
                    if( isDisplayTruckPricing ) {
                        for(var field in FT_MiniDetailBottomFieldsToStrHTML) {
                            if(truck[field]) {
                                miniDetailHtml += FT_MiniDetailBottomFieldsToStrHTML[field].FT_format([truck[field]]);
                            }                   
                        }
                    } else {
                        if( truck['VF_Website_Price__c'] == 'Held on Deposit' ) {
                            miniDetailHtml += '<div class="FT_PriceText">'+ FT_translatableStrings["pricingTxt"] +'</div><div class="FT_HodText">'+ FT_translatableStrings["hodTxt"] +'</div>';
                        } else {
                            miniDetailHtml += '<div class="FT_PriceText">'+ FT_translatableStrings["pricingTxt"] +'</div>';
                        }
                    }
                    miniDetailHtml += '<a class="FT_redBtn" '+
                                      '   style="color:'+FT_ThemeProperties.color+'; background:'+FT_ThemeProperties.background+'; border:1px solid '+FT_ThemeProperties.background+'" truckid="'+truck.Id+'" category="'+categoryName+'" page="'+pageNumber+'" index="'+idx+'" translatedcat="'+translatedCatName+'" Stock_No="'+truck.Stock_Number__c+'">'+ FT_translatableStrings['viewDetailsBtnText'] +'</a></div>';
                    miniDetailDiv.innerHTML = miniDetailHtml;
                    div.appendChild(miniDetailDiv);
                }
                /* Add lazy load class and data-src */
                var originalImgSrc = ((imgSrc) ? imgSrc : FT_truckTypeImageUrl[FT_defaultTruckImageKey]);
                if( !isForCategory ) {
                    img.setAttribute('class', 'FT_lazy');
                    img.setAttribute('data-src', originalImgSrc);
                    img.style.opacity = "0";
                } else {
                    img.src = originalImgSrc;
                }
                li.appendChild(div);
                ul.appendChild(li);
            }
        }
    }   
    return TruckImageContainer.appendChild(ul);;
}

function FT_getCategoryTruckCount( categoryName ) {
    var totalPages = 1;
    if( FT_catTruckCountMap[categoryName] ) { //check if given category exists in category truck count map
        if( FT_catTruckCountMap[categoryName] != 0 ) { //if truck count is not 0
            totalPages = Math.ceil( FT_catTruckCountMap[categoryName] / pageSize );
        }
    }
    return totalPages;
}

/* Lazy loading for images */
var FT_lazyImages = [];
function FT_cleanLazyLoadImages(){
    FT_lazyImages = 
    Array.prototype.filter.call(
        FT_lazyImages, 
        function(l){ 
            return l.getAttribute('data-src');
         }
    );
}
function FT_loadImage() {
    //fade effect
    this.style.transition = "opacity 3s";
    this.style.opacity = "1";
    var loaderSpan = this.parentNode.querySelectorAll('span.FT_loadingImage');
    loaderSpan[0].parentNode.removeChild(loaderSpan[0]);
}
function FT_lazyLoadImages(){
    for(var i = 0; i < FT_lazyImages.length; i++){
        if (FT_lazyImages[i].getAttribute('data-src')){
            FT_lazyImages[i].src = 
            FT_lazyImages[i].getAttribute('data-src');
            var currentImage = FT_lazyImages[i];
            currentImage.addEventListener("load",FT_loadImage);
            // remove the attribute
            FT_lazyImages[i].removeAttribute('data-src');
        }
    }
    FT_cleanLazyLoadImages();
}
function FT_setLazyLoad(){
    FT_lazyImages = document.getElementsByClassName('FT_lazy');
    FT_lazyLoadImages();
}

/* A function for set URL parameter for being copied.
 * @Param url           : URL in string format which going to updated.
 * @Param paramName     : Holding URL Parameter Name which we want to set.
 * @Param paramValue    : Holding URL Parameter value which we want to set.
 */
var FT_SetURLParam = function(url, paramName, paramValue) {
    var hash = location.hash;
    url = url.replace(hash, '');
    if (url.indexOf(paramName + "=") >= 0)
    {
        var prefix = url.substring(0, url.indexOf(paramName));
        var suffix = url.substring(url.indexOf(paramName));
        suffix = suffix.substring(suffix.indexOf("=") + 1);
        suffix = (suffix.indexOf("&") >= 0) ? suffix.substring(suffix.indexOf("&")) : "";
        url = prefix + paramName + "=" + paramValue + suffix;
    }
    else
    {
    if (url.indexOf("?") < 0)
        url += "?" + paramName + "=" + paramValue;
    else
        url += "&" + paramName + "=" + paramValue;
    }
    return  (url + hash);
}

var FT_removeUrlParam = function( key, sourceURL ) {
    var rtn = sourceURL.split("?")[0],
        param,
        params_arr = [],
        queryString = (sourceURL.indexOf("?") !== -1) ? sourceURL.split("?")[1] : "";
    if (queryString !== "") {
        params_arr = queryString.split("&");
        for (var i = params_arr.length - 1; i >= 0; i -= 1) {
            param = params_arr[i].split("=")[0];
            if (param === key) {
                params_arr.splice(i, 1);
            }
        }
        rtn = rtn + "?" + params_arr.join("&");
    }
    return rtn;
}

/* A function for get url parameter's value by there name.
 * @Param urlSearch : string url contains seach string only.
 * @Param param     : name of url parameter.
 */
var FT_GetParam = function( urlSearch, param) {
    var query = urlSearch.substring(1);
    var value = '';
    var vars = query.split("&");    
    for (var i=0; i<vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == param) {
            value = pair[1];
            break;
        }
    }
    return value;
}

function FT_getTruckFromCache( dbKey, truckIndex ) {
    var promise = new Promise( function( resolve, reject ) {
        if( FT_isIndexedDbCreated && FT_idxDb ) {
            var transaction = FT_idxDb.transaction(["FT_trucks"],"readwrite");
            if( transaction ) {
                var objectStore = transaction.objectStore("FT_trucks");
                if( objectStore ) {
                    var req = objectStore.openCursor(dbKey);
                    req.onsuccess = function(e) {
                        var cursor = e.target.result;
                        if (cursor) { // key already exist
                            var ob = objectStore.get(dbKey);
                            if( ob ) {
                                ob.onsuccess = function(e) {
                                    var pageTrucks = e.target.result;
                                    console.log( 'pageTrucks::', pageTrucks ); 
                                    if( pageTrucks && pageTrucks.length > 0 && pageTrucks[truckIndex] )
                                        resolve( pageTrucks[truckIndex] );
                                    else
                                        reject('Truck not found in cache');
                                }
                                ob.onerror = function(e) {
                                    reject('Error while fetching truck from cache');
                                }
                            } else {

                            }
                        } else {

                        }
                    }
                }
            }
        } else {
            reject('Cache db not isFound');
        }
    });
    return promise; 
}

/* A function for add images for selected truck.
 * @Param ParentNode    : DOM-element inside which all truck images will be added.
 * @Param ImageList     : list of object holding images/image-paths.
 */
var FT_addTruckImages = function(ParentNode, ImageList) {
    var swiperContainer = document.createElement('div');
    swiperContainer.className = 'FT_swiperContainer FT_fR';
    var mainImg = document.createElement('img');
    mainImg.className = 'FT_TruckImg img_0';
    swiperContainer.appendChild(mainImg);
    ParentNode.appendChild(swiperContainer);
    
    var truckImageContainer = document.createElement('div');
    truckImageContainer.className = 'FT_fL FT_thumbnail';
    swiperLargeImageList = [];
    ImageList.forEach( function(doc, index) {
        var img = document.createElement('img');
        img.className = 'FT_TruckImg img_'+ index;
        //in left side load large images and at right side load small thumbnails
        var largeImage = (doc['Amazon_S3_Image_URL__c'] ? doc['Amazon_S3_Image_URL__c'] : '');
        var imgSrc = (doc['Amazon_S3_Image_Thumbnail_URL__c'] ? doc['Amazon_S3_Image_Thumbnail_URL__c'] : '');
        if(doc['Main_Image__c']) {
            mainImg.src = largeImage;
        }
        if(!imgSrc) {
            imgSrc = FT_truckTypeImageUrl[FT_defaultTruckImageKey];
        }
        img.src = imgSrc;
        //add corrosponding large image in swiper large image array
        if( !largeImage ) {
            largeImage = FT_truckTypeImageUrl[FT_defaultTruckImageKey];
        }
        swiperLargeImageList[index] = largeImage;
        truckImageContainer.appendChild(img);
    });
    if(!mainImg.src && ImageList.length) {
        mainImg.src = ImageList[0]['Amazon_S3_Image_URL__c'];       
    }
    ParentNode.appendChild(truckImageContainer);

    /* Create a swipper for images to show in their original sizes : opens on click of any thumbnail */
    var modalWrap = document.createElement('div');
    modalWrap.className = 'FT_modal';
    modalWrap.setAttribute('id','FT_modal');
    var modalContainer = document.createElement('div');
    modalContainer.className = 'FT_modalContent';
    var closeBtn = document.createElement('span');
    closeBtn.className = 'FT_modalClose cursor';
    closeBtn.appendChild(document.createTextNode("x"));
    var nextArrow = document.createElement('a');
    nextArrow.className = 'FT_nextArrow';
    var prevArrow = document.createElement('a');
    prevArrow.className = 'FT_prevArrow';
    var slideNumber = document.createElement('div');
    slideNumber.className = 'FT_slideNumber';
    var currentSlideText = document.createElement('span');
    currentSlideText.className = 'FT_currentSlideTxt';
    slideNumber.appendChild(document.createTextNode('Image '));
    slideNumber.appendChild(currentSlideText);
    var totalSlides = document.createElement('span');
    totalSlides.appendChild(document.createTextNode(' of '+swiperLargeImageList.length));
    slideNumber.appendChild(totalSlides);
    swiperLargeImageList.forEach( function(imgSrc, index) {
        var singleSlide = document.createElement('div');
        singleSlide.className = 'FT_slide FT_fade';
        var slideImage = document.createElement('img');
        slideImage.src = imgSrc;
        singleSlide.appendChild(slideImage);
        modalContainer.appendChild(singleSlide);
    });
    modalWrap.appendChild(closeBtn);
    modalWrap.appendChild(modalContainer);
    if( swiperLargeImageList.length > 1 ) {
        modalWrap.appendChild(prevArrow);
        modalWrap.appendChild(nextArrow);
        modalWrap.appendChild(slideNumber);
    }   
    ParentNode.appendChild(modalWrap);
}

var FT_openModal = function() {
  document.getElementById('FT_modal').style.display = "block";
}
var FT_showSlide = function(n) {
  var i;
  var FT_slides = document.getElementsByClassName("FT_slide");
  if (n > FT_slides.length) {FT_slideIndex = 1} 
  if (n < 1) {FT_slideIndex = FT_slides.length}
  for (i = 0; i < FT_slides.length; i++) {
      FT_slides[i].style.display = "none"; 
  }
  if( document.getElementsByClassName('FT_currentSlideTxt')[0] )
    document.getElementsByClassName('FT_currentSlideTxt')[0].innerHTML = FT_slideIndex;
  FT_slides[FT_slideIndex-1].style.display = "block"; 
}
var FT_currentSlide = function(n) {
  FT_showSlide(FT_slideIndex = n);
}
/* A function handles click event of other imgaes of same truck.
 * @Param element   : DOM-element holding image of same truck.
 */
var FT_ImgClickHandler = function(element) {
    var imgIndexClass = element.className.split(' ');
    var imgIndex = ((imgIndexClass[1]) ? parseInt(imgIndexClass[1].split('_')[1]) : 0);
    FT_openModal();
    FT_currentSlide(imgIndex+1);
}
/* Functions for modal slider at truck detail page */
var FT_slideIndex = 1;
var FT_plusSlides = function(element) {
    FT_showSlide(FT_slideIndex += 1);
}
var FT_minusSlides = function(element) {
    FT_showSlide(FT_slideIndex -= 1);
}
var FT_closeModal = function(element) {
    document.getElementById('FT_modal').style.display = "none"; 
}

var removeFT_SelectClass = function(element){
    console.log( 'in removeFT_SelectClass' );
    element.classList.remove('FT_select');
}

/* A function to validate and mask the phone number.
 * @Param element   : set message for Error or Success.
 */
var FT_processNumberEntry = function(element) {
    var val = element.value;
    if(val.length >= 13) {
        element.value = formatPhone(val.replace(/[^0-9]+/g,'').slice(0, 10));
        return false;
    } else {
        element.value = formatPhone(val.replace(/[^0-9]+/g,''));
    }
    
    function formatPhone(value) {
        var digitList = value.split('');
        digitList.forEach(function(char, index) {
            if(index === 2 || index === 6) {
                digitList.splice( index+1, 0, '-');
            }
        });
        return digitList.join('');
    }
}

/* A function to create loader node */
var FT_createLoaderNode = function() {
    var loaderWrap = document.createElement('div');
    loaderWrap.className = 'FT_container FT_loaderContainer';
    var loaderBg = document.createElement('div');
    loaderBg.className = 'bgBlack FT_loader';
    loaderBg.setAttribute('id','FT_loader');
    var innerDiv = document.createElement('div');
    innerDiv.className = 'whtieBg';
    var loaderDiv = document.createElement('div');
    loaderDiv.className = 'loader';
    loaderDiv.setAttribute('style', 'border-top: 4px solid '+FT_ThemeProperties.background);
    innerDiv.appendChild(loaderDiv);
    loaderBg.appendChild(innerDiv); 
    loaderWrap.appendChild(loaderBg);
    return loaderWrap;
}

/* A function for reset page message.
 * @Param element   : DOM element under which page messages are displayed.
 */
var FT_clearFormMessage = function(element) {
    var messageContainer = document.getElementById('messageContainerId');
    if( messageContainer )
        messageContainer.innerHTML = '';
    
    var sellMessageContainer = document.getElementById('sellMessageContainerId');
    if( sellMessageContainer )
        sellMessageContainer.innerHTML = '';

    var truckFinderMessageContainer = document.getElementById('truckFinderMessageContainerId');
    if( truckFinderMessageContainer )
        truckFinderMessageContainer.innerHTML = '';                    
}

/* A function to add page message.
 * @Param isSuccess : set message for Error or Success.
 * @Param errorMessage  : Message to display.
 */
var FT_setMessage = function(isSuccess, errorMessage, msgContainerId) {
    var messageContainer = document.getElementById( msgContainerId );
    messageContainer.innerHTML = '';
    messageDiv = document.createElement('div');
    messageDiv.className += ((isSuccess) ? 'FT_successMsg' : 'FT_errorMsg');                
    messageDiv.innerHTML  = errorMessage + '<a class="FT_closeBtn"/>';      
    messageContainer.appendChild(messageDiv);
    FT_bindEvent('click', FT_clearFormMessage, messageContainer.getElementsByTagName('a'));
}

/* A function to submit from for inquiry. 
 * @Param element   : DOM element upon which class will be searched.
 * @Param className : class Name to search.
 */
var FT_hasClass = function(element, className) {
    var hadClass = false;
    element.className.split(' ').some(function(elementClass) {
        return hadClass = (elementClass === className);
    });
    return hadClass;
}

/* A function to validate data and display error messages if any, before submit. */
var FT_validateData = function() {
    var isProcced = true;
    var inquirJSON = {};
    var inquiryTab = document.getElementById(FT_tab2Id);
    var messageContainer = document.getElementById('messageContainerId');
    messageContainer.innerHTML = '';
    var fieldElementList = inquiryTab.getElementsByClassName('FT_input');
    var isFocusSet = false;
    var isEmailValid = false;
    var isPhoneValid = false;
    var requiredEmpty = false;
    for(var index = 0; index < fieldElementList.length; index++) {
        var element = fieldElementList[index];
        var elementValue = element.value;
        var errorMessage;
        if(elementValue && elementValue.trim()) {
            if(FT_hasClass(element, 'FT_required')) {               
                if(FT_hasClass(element, 'FT_email')) {
                    isEmailValid = FT_emailRegex.test(elementValue);
                    if(!isEmailValid) {
                        errorMessage = FT_translatableStrings['invalidEmailError'];
                        isProcced = false;
                    } else {
                        element.style.borderColor = 'darkgrey';
                    }                   
                } else if(FT_hasClass(element, 'FT_phone')) {
                    isPhoneValid = FT_phoneRegex.test(elementValue);
                    if(!isPhoneValid) {
                        errorMessage = FT_translatableStrings['invalidPhoneError'];
                        isProcced = false;
                    } else {
                        element.style.borderColor = 'darkgrey';
                    }
                } else {
                    if( !requiredEmpty && isPhoneValid && isEmailValid ) {
                        isProcced = true;
                    }
                    element.style.borderColor = 'darkgrey';
                }       
            }
            if(isProcced) {
                inquirJSON[element.name] = elementValue;
                element.style.borderColor = 'darkgrey';
            } else {
                //element.style.borderColor = 'red';
            }
        } else if(FT_hasClass(element, 'FT_required')) {
            element.style.borderColor = 'red';
            if(isProcced) isProcced = false;
            requiredEmpty = true;
            errorMessage = FT_translatableStrings['requiredErrormsg'];
        }
        if(!isProcced) {
            if( !isFocusSet ) {
                element.focus();
                isFocusSet = true;
            }
            FT_setMessage(isProcced, errorMessage, 'messageContainerId');         
        }       
    }
    return ((isProcced)? inquirJSON : isProcced);
}
/* 
* Function to get given cookie
* @cname : cookie name to get 
*/
var FT_getCookie = function(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
/*
* Function to save form data to cookie which can be used for furthet form sumissions
* @formData : form filled data to be saved in cookie
*/
var FT_saveFormToCookie = function (formData) {
    var d = new Date();
    d.setTime(d.getTime() + (365 * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = "inquiryFormData=" + formData + ";" + expires + ";path=/";  
};

/* A function to submit from for inquiry. */
var FT_submitEnquiry = function() {
    var JSON_Buffer = FT_validateData();
    if(JSON_Buffer) {
        JSON_Buffer['AccountId'] = FT_DealerAccointId;
        JSON_Buffer['TruckId'] = FT_TruckId;
        //display loader
        document.getElementsByClassName('inquiryFrom')[0].style.display = 'none';
        document.getElementsByClassName('FT_loaderContainer')[0].style.display = 'block';
        FT_WebRequestHandler.postRequest(JSON.stringify(JSON_Buffer), function(xhttp) {
            if ( xhttp && xhttp.readyState == 4 && xhttp.status == 200 ) {
                var serverResponse = JSON.parse(xhttp.responseText);
                //console.log('serverResponse: ',serverResponse);

                var firstParse = JSON.parse( serverResponse.Data );

                if( FT_isJSON( firstParse ) ) {

                    var serverData = JSON.parse( firstParse );
                    if( serverData.strMessage == 'Success' ) {
                        FT_setMessage( true, FT_translatableStrings['inquiryFormSuccessMsg'], 'messageContainerId' );
                        FT_saveFormToCookie(JSON.stringify(JSON_Buffer));                   
                    } else {
                        console.log(serverResponse.Message);
                        FT_setMessage( false, FT_getFormErrorMsg(), 'messageContainerId' );
                        FT_callSiteDownAlertService( 'Error occurred while submitting enquiry form: '+serverResponse.Message );
                    }
                    
                } else {
                    FT_setMessage( false, firstParse[0].message, 'messageContainerId' );
                    console.log( 'Error: ',firstParse[0].message );
                    FT_callSiteDownAlertService( 'Error occurred while submitting enquiry form: '+firstParse[0].message );
                }
                
            }
            //hide loader
            document.getElementsByClassName('inquiryFrom')[0].style.display = 'block';
            document.getElementsByClassName('FT_loaderContainer')[0].style.display = 'none';
        });
    }
}

/* A function to add Intrest form to DOM. */
var FT_addInetrestFrom = function() {
    var fieldAndType = {
        'First Name':'input',
        'Last Name':'input',
        'Phone':'input',
        'Email':'input',
        'Purchase Timeframe':'select',
        //'Make An Offer':'div',
        'City':'input',
        'State':'select',
        'FD or Company': 'input',
        'Inquiry Message':'textarea'
    }
    
    var fieldToClasses = {
        'First Name':'FT_input FT_required',
        'Last Name':'FT_input FT_required',
        'Phone':'FT_input FT_required FT_phone',
        'Email':'FT_input FT_required FT_email',
        'Purchase Timeframe':'FT_input FT_required',
        //'Make An Offer':'',
        'City':'FT_input FT_required',
        'State':'FT_input FT_required',
        'FD or Company': 'FT_input FT_required',
        'Inquiry Message':'FT_input FT_required'
    }
    /* set initial values of form fields */
    var fieldToValues = {
        'First Name':'',
        'Last Name':'',
        'Phone':'',
        'Email':'',
        'Purchase Timeframe':' ',
        //'Make An Offer':'',
        'City':'',
        'State':' ',
        'FD or Company': '',
        'Inquiry Message':''
    }
    /* get form field values from cookie and if cookie is set then override it's values */
    var inquiryFormData = FT_getCookie("inquiryFormData");
    if( inquiryFormData != "" ) {
        var frmData = JSON.parse(inquiryFormData);
        if( frmData['FirstName'] ) fieldToValues['First Name'] = frmData['FirstName'];
        if( frmData['LastName'] ) fieldToValues['Last Name'] = frmData['LastName'];
        if( frmData['Phone'] ) fieldToValues['Phone'] = frmData['Phone'];
        if( frmData['Email'] ) fieldToValues['Email'] = frmData['Email'];
        if( frmData['PurchaseTimeframe'] ) fieldToValues['Purchase Timeframe'] = frmData['PurchaseTimeframe'];
        if( frmData['City'] ) fieldToValues['City'] = frmData['City'];
        if( frmData['State'] ) fieldToValues['State'] = frmData['State'];
        if( frmData['FDorCompany'] ) fieldToValues['FD or Company'] = frmData['FDorCompany'];
        if( frmData['InquiryMessage'] ) fieldToValues['Inquiry Message'] = frmData['InquiryMessage'];       
    }
    
    var PurchaseTimeframeOpt = ['', 'Less than 1 month', '1 month - 3 months', '6 months - 12 months', '12 months+'];
    var StateOpt = {
        "United States" : [ "AL", "AK", "AZ", "AR", "AS", "CA", "CO", "CT", "DC", "DE", "FM", "FL", "GA", "GU", "HI", "IA", "ID", "IL", "IN", "KS", "KY", "LA", "MA", "ME", "MD", "MH", "MI", "MN", "MS", "MO", "MT", "MP", "NE", "NH", "NJ", "NM", "NY", "NC", "ND", "NV", "OH", "OK", "OR", "PA", "PR", "QC", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VI", "VA", "WA", "WV", "WI", "WY" ], 
        "Canada" : [ "AB", "BC", "MB", "NL", "NB", "NS", "NT", "NU", "ON", "PE", "QC", "SK", "YT" ]
    };
    var tab2Div = document.createElement('div');
    tab2Div.id = FT_tab2Id;
    tab2Div.style.display = 'none';
    tab2Div.className = 'FT_gryTxt';
    
    if( isDisplayDealerPhone ) {
        var formTitleDiv = document.createElement('div');
        formTitleDiv.innerHTML = FT_translatableStrings['contactUsText'];
        formTitleDiv.className = 'FT_formTitle';
        tab2Div.appendChild(formTitleDiv);
    }
    var formWarpper = document.createElement('div');
    formWarpper.className = 'inquiryFrom';
    var messageContainerDiv = document.createElement('div');
    messageContainerDiv.id = 'messageContainerId';
    messageContainerDiv.classClass = 'FT_closeBtn';
    formWarpper.appendChild(messageContainerDiv);
    var index = 0;
    for(var fieldName in fieldAndType) {
        var inputContainer = document.createElement('div');
        inputContainer.className += ((index%2) ? 'FT_fL' : 'FT_fR');
        var dynamicDom = document.createElement(fieldAndType[fieldName]);
        dynamicDom.name = fieldName.replace(/\s/g,'');
        dynamicDom.className = fieldToClasses[fieldName];
        if(fieldName === 'Purchase Timeframe') {
            dynamicDom.className += ' FT_gryTxt FT_select';
            PurchaseTimeframeOpt.forEach(function(opt) {                
                var option = document.createElement('option');
                option.value = (opt) ? opt: ' ';
                option.innerHTML = (opt) ? opt: (( typeof FT_translatableStrings[fieldName] != 'undefined' ) ? FT_translatableStrings[fieldName] : 'Timeframe');
                if(!opt) {
                    option.disabled = true;
                    option.selected = true;
                }
                dynamicDom.appendChild(option);
            });
            
            FT_bindEvent('change', removeFT_SelectClass, [dynamicDom]);
        } else if(fieldName === 'State') {
            dynamicDom.className += ' FT_gryTxt FT_select';
            //default selected option "State"
            var option = document.createElement('option');
            option.value = ' ';
            option.innerHTML =( typeof FT_translatableStrings[fieldName] != 'undefined' ) ? FT_translatableStrings[fieldName] : fieldName;
            option.disabled = true;
            option.selected = true;   
            dynamicDom.appendChild(option);
            //create option group
            for( var key in StateOpt ) {
                var optGroup = document.createElement('optgroup');
                optGroup.setAttribute( "label", key );
                StateOpt[ key ].forEach( function( opt ) {
                    var option = document.createElement('option');
                    option.value = opt;
                    option.innerHTML = opt;
                    optGroup.appendChild(option);
                });                         
                dynamicDom.appendChild( optGroup );
            }
            FT_bindEvent('change', removeFT_SelectClass, [dynamicDom]);
        } else {
            dynamicDom.placeholder = ( typeof FT_translatableStrings[fieldName] != 'undefined' ) ? FT_translatableStrings[fieldName] : fieldName;           
            if(fieldName === 'Phone') {
                FT_bindEvent('keyup', FT_processNumberEntry, [dynamicDom]);
            } else if(fieldName === 'Inquiry Message') {
                inputContainer.className += 'FT_TextArea';
            }           
        }
        //populate value from cookie data (check conditions if radio/checkbox field is added in form)
        if( fieldAndType[fieldName] == 'input' || fieldAndType[fieldName] == 'select' || fieldAndType[fieldName] == 'textarea' )
            dynamicDom.value = fieldToValues[fieldName];
        inputContainer.appendChild(dynamicDom);
        formWarpper.appendChild(inputContainer);
        index++;
    }
    var submitButton = document.createElement('button');
    submitButton.type = 'button';
    submitButton.className = 'FT_submitBtn';
    submitButton.innerHTML = FT_translatableStrings['enquiryFormSubmitTxt'];
    formWarpper.appendChild(submitButton);
    tab2Div.appendChild(formWarpper);
    //append loader displayed when for is submitted
    var loaderDiv = FT_createLoaderNode();
    tab2Div.appendChild(loaderDiv);
    FT_bindEvent('click', FT_submitEnquiry, [submitButton]);
    return tab2Div;
}

/* A function to add share link tab to DOM. */
var FT_addShareLinkTab = function() {
    var tab3Div = document.createElement('div');
    tab3Div.id = FT_tab3Id;
    tab3Div.style.display = 'none';
    tab3Div.className = 'FT_gryTxt';
    
    var a = document.createElement('a');
    a.id = 'linkContainerId';
    a.innerHTML = window.location.href;
    //a.innerHTML = parent.document.location.href;
    for(var param in FT_URLParam) {
        a.innerHTML = FT_SetURLParam(a.innerHTML, param, encodeURIComponent( FT_URLParam[param] ) );
    }
    a.innerHTML = decodeURI(a.innerHTML);
    //a.href = a.innerHTML;
    tab3Div.appendChild(a);
    
    var copyBtn = document.createElement('a');
    copyBtn.className += 'copyBtn';
    copyBtn.innerHTML = FT_translatableStrings['copyBtnText'];
    copyBtn.style.cursor = 'pointer';
    copyBtn.setAttribute('containerId', a.id);
    tab3Div.appendChild(copyBtn);
    
    return tab3Div;
}

/* A function to Tab click handling. */
var FT_tabClickHandling = function(selectedTab) {
    var liTab = selectedTab.parentNode;
    var currentTabToDisplay = document.getElementById(selectedTab.name);
    var activeTabs = liTab.parentNode.getElementsByClassName('FT_active');
    for(var index = 0; index < activeTabs.length; index++) {
        document.getElementById(activeTabs[index].getElementsByTagName('a')[0].name).style.display = 'none';
        activeTabs[index].classList.remove('FT_active');
    }
    currentTabToDisplay.style.display = 'block';
    liTab.className += 'FT_active'; 
    if(selectedTab.name === FT_tab2Id) {
        var id = setTimeout(function(){
            currentTabToDisplay.getElementsByClassName('FT_input')[0].focus();
        }, 500);
    }
}

/* A function for copy link text to clipboard.
 * @Param element   : DOM-element which's inner html will be copied.
 */
var FT_CopyInnerText = function(element) {
    var sel, range;
    var id = element.getAttribute('containerId');
    var el = document.getElementById(id); //get element id
    if (window.getSelection && document.createRange) { //Browser compatibility
        var copyTxt = el.firstChild.nodeValue;
        //var copyTxt = el.innerHTML; 
        //copyTxt = copyTxt.replace(/&amp;/g, '&');
        //alert( 'copyTxt: '+copyTxt );
        console.log( 'copyTxt: ',copyTxt );
        Clipboard.copy( copyTxt );
        /*sel = window.getSelection();
        range = document.createRange(); //range object
        range.selectNodeContents(el); //sets Range
        sel.removeAllRanges(); //remove all ranges from selection
        sel.addRange(range);//add Range to a Selection.
        document.execCommand('copy');*/
    } else if (document.selection) { //older ie
        sel = document.selection.createRange();
        range = document.body.createTextRange();//Creates TextRange object
        range.moveToElementText(el);//sets Range
        range.select(); //make selection.
        document.execCommand('copy');
    }
}

/* A function to add tabs to DOM. */
var FT_createTabs = function() {
    var ul = document.createElement('ul');
    ul.className = 'FT_tab-links';
    
    var li1 = document.createElement('li');
    li1.className = 'FT_active';
    var a1 = document.createElement('a');
    a1.innerHTML = FT_translatableStrings['descriptionTabText'];
    //a1.href = '#detailsTabId';    
    a1.href = 'javascript:void(0)'; 
    a1.name = FT_tab1Id;
    li1.appendChild(a1);
    ul.appendChild(li1);
    
    var li2 = document.createElement('li');
    var a2 = document.createElement('a');
    a2.innerHTML = FT_translatableStrings['inquiryTabText'];
    //a2.href = '#detailsTabId';
    a2.href = 'javascript:void(0)';
    a2.name = FT_tab2Id;
    li2.appendChild(a2);
    ul.appendChild(li2);
    
    var li3 = document.createElement('li');
    var a3 = document.createElement('a');
    a3.innerHTML = FT_translatableStrings['shareLinkTabText'];
    //a3.href = '#detailsTabId';
    a3.href = 'javascript:void(0)';
    a3.name = FT_tab3Id;
    li3.appendChild(a3);
    ul.appendChild(li3);
    
    return ul;
}

/* A function to diaply details of indivisual truck. 
 * @Param selectedTruck : javascript object of selected Truck.
 */
var FT_displayTabs = function(parentNode, selectedTruck) {
    
    TruckDetailsContainer = document.createElement('div');
    TruckDetailsContainer.id = 'detailsTabId';
    TruckDetailsContainer.className += 'FT_tabs';
    
    var tabs = FT_createTabs(selectedTruck.Id);
    TruckDetailsContainer.appendChild( tabs );
    
    var contentDiv = document.createElement('div');
    contentDiv.className += 'FT_content';
    
    var tab1Div = document.createElement('div');    
    tab1Div.id = FT_tab1Id;
    tab1Div.className = 'FT_gryTxt';
    
    var truckDetailsHtml = '';
    for(var field in FT_DetailFieldToStrHTML) {
        var innerFieldVal = '';
        var innerMostField = '';
        field.split('.').some(function(innerField, index) {
            //console.log( 'innerField: ',innerField, 'index: ',index );
            /*var innerObject = (!(index) ? selectedTruck : (innerObject) ? innerObject : '');
            console.log( 'innerObject: ',innerObject );
            innerFieldVal = ((innerObject[innerField]) ? innerObject[innerField] : null);
            innerMostField = innerField;
            console.log( 'innerMostField: ',innerMostField );
            return (innerFieldVal == null);*/
            var innerObject = !(index) ? selectedTruck : innerFieldVal;
            //console.log( 'innerObject: ',innerObject );
            if( innerObject ) {
                innerFieldVal = ((innerObject[innerField]) ? innerObject[innerField] : null);
            } else {
                innerFieldVal = null;
            }
            innerMostField = innerField;
            //console.log( 'innerMostField: ',innerMostField, 'innerFieldVal: ',innerFieldVal,innerFieldVal === null );
            return (innerFieldVal == null);
        });
        //console.log( 'field: ', field, 'innerFieldVal: ', innerFieldVal );
        if(innerFieldVal) {
            if(innerMostField === 'Stock_Number__c') {                            

                //console.log( 'globalAccountRecord: ', globalAccountRecord );
                if( globalAccountRecord && globalAccountRecord.Display_Stock_Number__c ) { //account record is returned by service and Display stock number filed is set
                    if( globalAccountRecord.Display_Stock_Number__c == 'Brindlee' ) { //if set to brindlee then show Stock number field
                        truckDetailsHtml += FT_DetailFieldToStrHTML[field].FT_format([FT_ThemeProperties.background, innerFieldVal]);
                    } else if( globalAccountRecord.Display_Stock_Number__c == 'Dealer' ) { //if set to dealer and FTF_Dealer_Stock__c set then show FTF_Dealer_Stock__c field
                        if( selectedTruck && selectedTruck['FTF_Dealer_Stock__c'] ) {
                            truckDetailsHtml += FT_DetailFieldToStrHTML[field].FT_format( [ FT_ThemeProperties.background, selectedTruck['FTF_Dealer_Stock__c'] ] );
                        }
                    } 
                } 
                    
                
            } else {
                truckDetailsHtml += '<p>'+FT_DetailFieldToStrHTML[field].FT_format([innerFieldVal])+'</p>';
            }
        }
    }
    tab1Div.innerHTML = truckDetailsHtml;
    contentDiv.appendChild( tab1Div );  
    // Adding From for user interest(tab2).
    var tab2 = FT_addInetrestFrom();
    contentDiv.appendChild( tab2 );
    // Adding Share Link Tab(tab3).
    var tab3 = FT_addShareLinkTab();
    contentDiv.appendChild( tab3 );
    
    TruckDetailsContainer.appendChild( contentDiv );
    parentNode.appendChild( TruckDetailsContainer )
    FT_bindEvent('click', FT_tabClickHandling, tabs.getElementsByTagName('a'));
    FT_bindEvent('click', FT_CopyInnerText, tab3.getElementsByClassName('copyBtn'));
}

/* Function to get height of main image of swipper and set it to thumbnails div */
var FT_setSwiperHeight = function() {
    if(document.getElementsByClassName('FT_fL FT_thumbnail').length > 0 && document.getElementsByClassName('FT_TruckImg img_0').length > 0 ) {
        var mainImage = document.getElementsByClassName('FT_TruckImg img_0')[0];
        var mainImgHeight = window.getComputedStyle(mainImage, null).getPropertyValue("height");
        document.getElementsByClassName('FT_fL FT_thumbnail')[0].style.maxHeight = mainImgHeight;
    }
}
window.addEventListener("resize", FT_setSwiperHeight);

function FT_prepareTruckDetails( truck ) {
    selectedTruck = truck;
    //add history
    if(history.state === null || (history.state !== null && history.state.page !== undefined && history.state.page != 'truckDetail' )) {
        //add history only when navigated from categories page and not opened directly using share link of truck
        if(navigatedFromCategories) {
            var historyUrl = window.location.href;
            //var historyUrl = parent.document.location.href;
            var urlParams = {stockno: selectedTruck['Stock_Number__c'], category: FT_lastCategorySelected.getAttribute('category') }
            for(var param in urlParams) {
                historyUrl = FT_SetURLParam(historyUrl, param, encodeURIComponent( urlParams[param] ) );
            }
            history.pushState({page:'truckDetail',category:FT_lastCategorySelected.getAttribute('category'), truck: FT_TruckId }, null, historyUrl);
        }
    }

    FT_URLParam.stockno = selectedTruck['Stock_Number__c'];
    var isValidCategory = ( FT_URLParam.category && (selectedTruck['apparatusType__c'].indexOf( decodeURIComponent( FT_URLParam.category ) ) > -1) );
    FT_URLParam.category = (isValidCategory ? decodeURIComponent( FT_URLParam.category ) : FT_lastCategorySelected.getAttribute('category'));
    
    FT_lastTruckSelected = selectedTruck;
    FT_clearContainerDom();
    
    var containerDiv = document.createElement('div');
    containerDiv.className = 'FT_container';

    FT_constructBackButton('To Truck List');
    var truckContainer = document.createElement('div');
    truckContainer.className = 'FT_innerContainer';
    truckContainer.setAttribute('truckId', FT_TruckId);
    truckContainer.align = "left";
    var truckPart1Container = document.createElement('div');
    var TruckDetailsHtml = '';
    for(var field in FT_GlobalFieldToStrHTML) {                 
        var fieldVal = ((selectedTruck[field]) ? selectedTruck[field] : '');
        if(field === 'Cloud_Documents__r') {
            var tempImageContainer = document.createElement('div');
            truckImageContainer = document.createElement('div');                
            if(selectedTruck[field]) {
                var cloudDocs = selectedTruck[field].records;
                FT_addTruckImages(truckImageContainer, selectedTruck[field].records);
            } else {
                FT_addTruckImages(truckImageContainer, [{Main_Image__c:true, Amazon_S3_Main_Thumbnail_URL__c:FT_truckTypeImageUrl[FT_defaultTruckImageKey]}]);
            }
            tempImageContainer.appendChild(truckImageContainer);
            var clearFloatDiv = document.createElement('div');
            clearFloatDiv.className = 'FT_clr';
            tempImageContainer.appendChild(clearFloatDiv);
            TruckDetailsHtml += tempImageContainer.innerHTML;
        } else if(field === 'VF_Website_Price__c') {
            //var linkUrl = ((selectedTruck['Truck_Public_URL__c']) ? selectedTruck['Truck_Public_URL__c'] : '');
            var pricingText = fieldVal;
            //console.log('pricingText: ',pricingText);
            if( !isDisplayTruckPricing ) {
                if( selectedTruck[ field ] == 'Held on Deposit' )  {
                    pricingText = FT_translatableStrings["pricingTxt"]+' ('+ FT_translatableStrings["hodTxt"] +')';    
                } else {
                    pricingText = FT_translatableStrings["pricingTxt"]; 
                }
            } 
            var isDisplayDetailpgCallusSpanCss = ( isDisplayDealerPhone ) ? 'inline' : 'none';
            TruckDetailsHtml += FT_GlobalFieldToStrHTML[field].FT_format([FT_ThemeProperties.background, pricingText, 'document.getElementsByName(\''+FT_tab2Id+'\')[0].click()', FT_translatableStrings['inquiryLinkText1'], FT_translatableStrings['inquiryLinkText2'], FT_translatableStrings['inquiryLinkText3'], FT_translatableStrings['detailPageCallusText'], isDisplayDetailpgCallusSpanCss ]);
        } else {
            TruckDetailsHtml += FT_GlobalFieldToStrHTML[field].FT_format([fieldVal]);
        }
    }
    truckPart1Container.innerHTML = TruckDetailsHtml;
    truckContainer.appendChild(truckPart1Container);

    //add truckMsg to display "No results found" message if random search string added
    //containerDiv.appendChild(FT_truckMsg());

    containerDiv.appendChild(truckContainer);
    //FT_BMFA_TruckContainer.appendChild(truckContainer);
    var shareLinkDiv = document.createElement('div');
    shareLinkDiv.className += 'FT_copyLinkDiv';
    containerDiv.appendChild(shareLinkDiv);
    //FT_BMFA_TruckContainer.appendChild(shareLinkDiv);
    
    FT_BMFA_TruckContainer.appendChild(containerDiv);
    FT_bindEvent('click', FT_ImgClickHandler, FT_BMFA_TruckContainer.getElementsByClassName('FT_TruckImg'));
    //modal slider events
    FT_bindEvent('click', FT_plusSlides, FT_BMFA_TruckContainer.getElementsByClassName('FT_nextArrow'));
    FT_bindEvent('click', FT_minusSlides, FT_BMFA_TruckContainer.getElementsByClassName('FT_prevArrow'));
    FT_bindEvent('click', FT_closeModal, FT_BMFA_TruckContainer.getElementsByClassName('FT_modalClose'));   
    FT_displayTabs(truckContainer, selectedTruck);  
    //set max height to thumbnails div similar to calculated height of main image
    var swiperMainImg = document.getElementsByClassName('FT_TruckImg img_0')[0];
    if( swiperMainImg )
        swiperMainImg.addEventListener("load",FT_setSwiperHeight);
    FT_addPageFooter(FT_BMFA_TruckContainer);
    //Scroll to top at start of truck container div 
    if(!FT_isSafariOrIos()){ //avoid scroll top for safari
        FT_scrollTop(); 
    }
}

function FT_prepareTruckSearchDetails(truck){

    selectedTruck = truck;
    //add history
    navigatedFromCategories = false;
    //////////////////////////////////////////////////////
    var historyUrl = window.location.href;
    //var historyUrl = parent.document.location.href;
    var currentCategory = pgFilter['ApparatusType'] == '--None--' ? 'All' : pgFilter['ApparatusType'];
    
    var urlParams = { stockno: selectedTruck['Stock_Number__c'], category: currentCategory}
    for (var param in urlParams) {  
        historyUrl = FT_SetURLParam(historyUrl, param, encodeURIComponent(urlParams[param]));
    }
    history.pushState({ page: 'truckDetail', category: FT_lastCategorySelected.getAttribute('category'), truck: FT_TruckId }, null, historyUrl);
    //////////////////////////////////////////////////////////////////////////////////

    FT_URLParam.stockno = selectedTruck['Stock_Number__c'];
    var isValidCategory = (FT_URLParam.category && (selectedTruck['apparatusType__c'].indexOf(decodeURIComponent(FT_URLParam.category)) > -1));
    FT_URLParam.category = (isValidCategory ? decodeURIComponent(FT_URLParam.category) : FT_lastCategorySelected.getAttribute('category'));

    FT_lastTruckSelected = selectedTruck;
    FT_clearContainerDom();

    var containerDiv = document.createElement('div');
    containerDiv.className = 'FT_container';

    FT_constructBackButton('To Truck List');

    //add truckMsg to display "No results found" message if random search string added
    //containerDiv.appendChild(FT_truckMsg());

    var truckContainer = document.createElement('div');
    truckContainer.className = 'FT_innerContainer';
    truckContainer.setAttribute('truckId', FT_TruckId);
    truckContainer.align = "left";
    var truckPart1Container = document.createElement('div');
    var TruckDetailsHtml = '';
    for (var field in FT_GlobalFieldToStrHTML) {
        var fieldVal = ((selectedTruck[field]) ? selectedTruck[field] : '');
        if (field === 'Cloud_Documents__r') {
            var tempImageContainer = document.createElement('div');
            truckImageContainer = document.createElement('div');
            if (selectedTruck[field]) {
                var cloudDocs = selectedTruck[field].records;
                FT_addTruckImages(truckImageContainer, selectedTruck[field].records);
            } else {
                FT_addTruckImages(truckImageContainer, [{ Main_Image__c: true, Amazon_S3_Main_Thumbnail_URL__c: FT_truckTypeImageUrl[FT_defaultTruckImageKey] }]);
            }
            tempImageContainer.appendChild(truckImageContainer);
            var clearFloatDiv = document.createElement('div');
            clearFloatDiv.className = 'FT_clr';
            tempImageContainer.appendChild(clearFloatDiv);
            TruckDetailsHtml += tempImageContainer.innerHTML;
        } else if (field === 'VF_Website_Price__c') {
            //var linkUrl = ((selectedTruck['Truck_Public_URL__c']) ? selectedTruck['Truck_Public_URL__c'] : '');
            var pricingText = fieldVal;
            //console.log('pricingText: ',pricingText);
            if (!isDisplayTruckPricing) {
                if (selectedTruck[field] == 'Held on Deposit') {
                    pricingText = FT_translatableStrings["pricingTxt"] + ' (' + FT_translatableStrings["hodTxt"] + ')';
                } else {
                    pricingText = FT_translatableStrings["pricingTxt"];
                }
            }
            var isDisplayDetailpgCallusSpanCss = (isDisplayDealerPhone) ? 'inline' : 'none';
            TruckDetailsHtml += FT_GlobalFieldToStrHTML[field].FT_format([FT_ThemeProperties.background, pricingText, 'document.getElementsByName(\'' + FT_tab2Id + '\')[0].click()', FT_translatableStrings['inquiryLinkText1'], FT_translatableStrings['inquiryLinkText2'], FT_translatableStrings['inquiryLinkText3'], FT_translatableStrings['detailPageCallusText'], isDisplayDetailpgCallusSpanCss]);
        } else {
            TruckDetailsHtml += FT_GlobalFieldToStrHTML[field].FT_format([fieldVal]);
        }
    }
    truckPart1Container.innerHTML = TruckDetailsHtml;
    truckContainer.appendChild(truckPart1Container);
    
    
    
    containerDiv.appendChild(truckContainer);
    
    /*// Start Element to display filter options*/
    
    //FT_BMFA_TruckContainer.appendChild(truckContainer);
    var shareLinkDiv = document.createElement('div');
    shareLinkDiv.className += 'FT_copyLinkDiv';
    containerDiv.appendChild(shareLinkDiv);
    //FT_BMFA_TruckContainer.appendChild(shareLinkDiv);

    FT_BMFA_TruckContainer.appendChild(containerDiv);
    FT_bindEvent('click', FT_ImgClickHandler, FT_BMFA_TruckContainer.getElementsByClassName('FT_TruckImg'));
    //modal slider events
    FT_bindEvent('click', FT_plusSlides, FT_BMFA_TruckContainer.getElementsByClassName('FT_nextArrow'));
    FT_bindEvent('click', FT_minusSlides, FT_BMFA_TruckContainer.getElementsByClassName('FT_prevArrow'));
    FT_bindEvent('click', FT_closeModal, FT_BMFA_TruckContainer.getElementsByClassName('FT_modalClose'));
    FT_displayTabs(truckContainer, selectedTruck);
    //set max height to thumbnails div similar to calculated height of main image
    var swiperMainImg = document.getElementsByClassName('FT_TruckImg img_0')[0];
    if (swiperMainImg)
        swiperMainImg.addEventListener("load", FT_setSwiperHeight);
    FT_addPageFooter(FT_BMFA_TruckContainer);
    //Scroll to top at start of truck container div 
    if (!FT_isSafariOrIos()) { //avoid scroll top for safari
        FT_scrollTop();
    }
}

/* A function handles click event on indivisual truck. 
 * @Param element   : DOM-element holding image of truck.
 */ 
var FT_getTruckDetails = function(element) {
    FT_TruckId = element.getAttribute('truckid');
    var selectedTruck;
    var isFound = false;
    var categoryName = element.getAttribute('category');
    var pageNumber = element.getAttribute('page');
    var truckIndex = element.getAttribute('index');
    var stock_no = element.getAttribute('stock_no');
    var translatedCatName = element.getAttribute('translatedcat');
    if( FT_idbSupported && FT_isIndexedDbCreated) {
        var idxDbKey = FT_removeSpecialChars(categoryName);
        idxDbKey = idxDbKey+'_'+pageNumber;
        //console.log('idxDbKey: ',idxDbKey);

        FT_getTruckFromCache( idxDbKey, truckIndex ).then(
            function( truck ) {
                console.log( 'truck from cache: ', truck );
                FT_prepareTruckDetails( truck );
            }, 
            function( error ) {
                console.log(error);
                FT_displayServerError( 'serverErrorMessage', 'Error occurred while fetching truck details from browser cache: '+error );
            }
        );  
    } else { //get truck data from server
        //show loader before requesting data from server
        FT_BMFA_TruckContainer.innerHTML = FT_LoaderHtml.FT_format([FT_ThemeProperties.background, FT_translatableStrings['loaderText']]);
        //set last selected category to all
        var catDiv = document.createElement('div');
        //catDiv.setAttribute('category',categoryName);
        FT_setAttributes( catDiv, { 'category' : categoryName, 'page' : pageNumber, 'translatedCat' : translatedCatName } );
        FT_lastCategorySelected = catDiv;
        //request data from server
        var additionalParam = { cat : categoryName, pageNum: pageNumber, stockn : stock_no };
        FT_WebRequestHandler.getPageRequest( FT_displayTruckDetails, additionalParam );
    }    
}
/* A function handles click event on indivisual truck FROM SEARCH. 
     * @Param element   : DOM-element holding image of truck.
     */
var FT_getTruckSearchDetails = function (element) {
    FT_TruckId = element.getAttribute('truckid');
    var selectedTruck;
    var isFound = false;
    var categoryName = element.getAttribute('category');
    var pageNumber = element.getAttribute('page');
    var truckIndex = element.getAttribute('index');
    var stock_no = element.getAttribute('stock_no');
    var translatedCatName = element.getAttribute('translatedcat');
    /*if (FT_idbSupported && FT_isIndexedDbCreated) {
        var idxDbKey = FT_removeSpecialChars(categoryName);
        idxDbKey = idxDbKey + '_' + pageNumber;
        //console.log('idxDbKey: ',idxDbKey);

        FT_getTruckFromCache(idxDbKey, truckIndex).then(
            function (truck) {
                console.log('truck from cache: ', truck);
                FT_prepareTruckSearchDetails(truck);
            },
            function (error) {
                console.log(error);
            }
        );
    } else { //get truck data from server*/
        //show loader before requesting data from server
        FT_BMFA_TruckContainer.innerHTML = FT_LoaderHtml.FT_format([FT_ThemeProperties.background, FT_translatableStrings['loaderText']]);
        //set last selected category to all
        var catDiv = document.createElement('div');
        //catDiv.setAttribute('category',categoryName);
        FT_setAttributes(catDiv, { 'category': categoryName, 'page': pageNumber, 'translatedCat': translatedCatName });
        FT_lastCategorySelected = catDiv;
        //request data from server
        var additionalParam = { cat: categoryName, pageNum: pageNumber, stockn: stock_no };
        FT_WebRequestHandler.getPageRequest(FT_displayTruckSearchDetails, additionalParam);
    //}
}
function FT_processTruckList( trucks, categoryName, pageNumber, translatedCatName ) {
    if(trucks.length) {
        //add history
        var currentUrl = window.location.href;
        if(history.state === null || (history.state !== null && history.state.page !== undefined && history.state.page != 'categoryDetail' )) { 
            //if not truck detail page then add category detail page in history
            if(FT_GetParam(currentUrl, 'stockno') == '') {
                var historyUrl = FT_SetURLParam(currentUrl, 'category', encodeURIComponent( categoryName ) );
                history.pushState({ page : 'categoryDetail',category : categoryName, 'translatedCat' : translatedCatName }, null, historyUrl);
            }
        } 
        var catDiv = document.createElement('div');
        //catDiv.setAttribute('category',categoryName);
        FT_setAttributes( catDiv, { 'category' : categoryName, 'page' : pageNumber, 'translatedCat' : translatedCatName } );
        FT_lastCategorySelected = catDiv;
        FT_clearContainerDom();
        
        var containerDiv = document.createElement('div');
        containerDiv.className = 'FT_container';

        FT_constructBackButton('To Categories');
        var titleDiv = document.createElement('div');
        titleDiv.className = 'FT_PageTitle';
        titleDiv.innerHTML = FT_translatableStrings['pageTitleStart']+ ((categoryName === 'All' ) ? ' '+FT_translatableStrings['allCatText'] : ' '+translatedCatName);
        //titleDiv.innerHTML = FT_translatableStrings['pageTitleStart']+ ((categoryName === 'All' ) ? ' '+FT_translatableStrings['allCatText'] : ' '+categoryName);
        
        containerDiv.appendChild(titleDiv);

        //add truckMsg to display "No results found" message if random search string added
        //containerDiv.appendChild(FT_truckMsg());

       /* // End Element to display filter options*/
        containerDiv.appendChild( FT_prepareImageContainer( false, trucks, 'FT_truckList', categoryName, pageNumber, translatedCatName ) );
        
        var paginationDiv = document.createElement('div');
        paginationDiv.className = 'FT_Pagination';

        if( parseInt(pageNumber)-1 > 0  ) {
            var prevBtn = document.createElement('a');
            prevBtn.className = 'FT_PagePrev FT_PaginaionBtn';
            //prevBtn.setAttribute('category', categoryName);
            var prevPageNumber = ( (pageNumber-1) > 0 ) ? (pageNumber-1) : 1;
            FT_setAttributes( prevBtn, { "category": categoryName, "page" : parseInt(pageNumber)-1, "translatedcat" : translatedCatName } );
            var btnText = document.createTextNode(FT_translatableStrings['paginationPrevText']);
            prevBtn.appendChild(btnText);
            prevBtn.style.cssText = 'color:'+FT_ThemeProperties.color+'; background:'+FT_ThemeProperties.background+'; border:1px solid '+FT_ThemeProperties.background;
            paginationDiv.appendChild(prevBtn);   
        }
        var totalPages = FT_getCategoryTruckCount( categoryName );

        var paginationTextSpan = document.createElement('span');
        var paginationText1 = document.createTextNode( FT_translatableStrings['paginationText1']+' ' );
        var paginationText2 = document.createTextNode( pageNumber );
        var paginationText3 = document.createTextNode( ' '+FT_translatableStrings['paginationText2'] +' '+totalPages );
        paginationTextSpan.appendChild(paginationText1);

        //create a select list of pages to navigate between pages
        if( totalPages > 1 ) {
            var paginationSelect = document.createElement('select');
            paginationSelect.className = 'FT_pageSelect';
            for( var i = 1; i <= totalPages; i++ ) {
                var pageOption = document.createElement('option');
                pageOption.value = i;
                pageOption.text = i;
                if( i == pageNumber ) pageOption.selected = true;
                FT_setAttributes( pageOption, { "category": categoryName, "page" : i, "translatedcat" : translatedCatName } );
                paginationSelect.appendChild(pageOption);
            }
            paginationTextSpan.appendChild(paginationSelect);
            paginationSelect.addEventListener(
                'change',
                function() { FT_expandCategory(this.options[this.selectedIndex]); },
                 false
            );
        } else {
            paginationTextSpan.appendChild(paginationText2);
        }
        paginationTextSpan.appendChild(paginationText3);        
        
        paginationDiv.appendChild(paginationTextSpan);

        if( parseInt(pageNumber)+1 <= totalPages ) {
            var nextBtn = document.createElement('a');
            nextBtn.className = 'FT_PageNext FT_PaginaionBtn';
            FT_setAttributes( nextBtn, { "category": categoryName, "page" : parseInt(pageNumber)+1, "translatedcat" : translatedCatName } );
            //nextBtn.setAttribute('category', categoryName);
            var btnText = document.createTextNode(FT_translatableStrings['paginationNextText']);
            nextBtn.appendChild(btnText);
            nextBtn.style.cssText = 'color:'+FT_ThemeProperties.color+'; background:'+FT_ThemeProperties.background+'; border:1px solid '+FT_ThemeProperties.background;            
            paginationDiv.appendChild(nextBtn);
        }

        containerDiv.appendChild(paginationDiv);

        FT_BMFA_TruckContainer.appendChild(containerDiv);
        FT_addPageFooter(FT_BMFA_TruckContainer);
        FT_bindEvent('click', FT_getTruckDetails, FT_BMFA_TruckContainer.querySelectorAll('img'));
        FT_bindEvent('click', FT_getTruckDetails, FT_BMFA_TruckContainer.querySelectorAll('a.FT_redBtn'));
        
        //bind pagination events
        FT_bindEvent('click', FT_expandCategory, FT_BMFA_TruckContainer.querySelectorAll('a.FT_PaginaionBtn'));
        //FT_bindEvent('change', FT_expandCategory, FT_BMFA_TruckContainer.querySelectorAll('.FT_pageSelect'));

        //call lazy load
        FT_setLazyLoad();
        /* Scroll to top at start of truck container div */
        if( !FT_isSafariOrIos() ) { //avoid scroll top for safari
            FT_scrollTop();  
        }
    } 
}

function FT_processSearchTruckList( trucks, translatedCatName, fromBackButton ) {
    if (trucks.length) {
        
        
        //add history
        var categoryName = 'All',pageNumber='1';
        if(isPgFilterApply){
            categoryName = pgFilter['ApparatusType'][0];
            pageNumber = pgFilter['page'];
        }
        
        if(!categoryName || categoryName == '--None--'){
            categoryName = 'All';
        }
        
        var currentUrl = window.location.href;
        if (history.state === null || (history.state !== null && history.state.page !== undefined && history.state.page != 'categoryDetail')) {
            //if not truck detail page then add category detail page in history
            var historyUrl = currentUrl;
            var urlParams = {category: categoryName}
            for (var param in urlParams) {  
                historyUrl = FT_SetURLParam(historyUrl, param, encodeURIComponent(urlParams[param]));
            }
            history.pushState({ page: 'categoryDetail', 'translatedCat': translatedCatName }, null, historyUrl);
        }
        
        
        FT_clearContainerDom();
        
        var containerDiv = document.createElement('div');
        containerDiv.className = 'FT_container';

        FT_constructBackButton('To Categories');
        var titleDiv = document.createElement('div');
        titleDiv.className = 'FT_PageTitle';
        titleDiv.innerHTML = FT_translatableStrings['pageTitleStart'] + ((categoryName === 'All' || categoryName === '--None--') ? ' ' + FT_translatableStrings['allCatText'] : ' ' + translatedCatName);
        //titleDiv.innerHTML = FT_translatableStrings['pageTitleStart']+ ((categoryName === 'All' ) ? ' '+FT_translatableStrings['allCatText'] : ' '+categoryName);

        containerDiv.appendChild(titleDiv);

        //add truckMsg to display "No results found" message if random search string added
        //containerDiv.appendChild(FT_truckMsg());

        /*// End Element to display filter options*/
        containerDiv.appendChild(FT_prepareImageContainer(false, trucks, 'FT_truckList', categoryName, pageNumber, translatedCatName));

        var paginationDiv = document.createElement('div');
        paginationDiv.className = 'FT_Pagination';

        if (parseInt(pageNumber) - 1 > 0) {
            var prevBtn = document.createElement('a');
            prevBtn.className = 'FT_PagePrev FT_PaginaionBtn';
            //prevBtn.setAttribute('category', categoryName);
            var prevPageNumber = ((pageNumber - 1) > 0) ? (pageNumber - 1) : 1;
            FT_setAttributes(prevBtn, { "category": categoryName, "page": parseInt(pageNumber) - 1, "translatedcat": translatedCatName, "onclick":"onPrevClick();" });
            var btnText = document.createTextNode(FT_translatableStrings['paginationPrevText']);
            prevBtn.appendChild(btnText);
            prevBtn.style.cssText = 'color:' + FT_ThemeProperties.color + '; background:' + FT_ThemeProperties.background + '; border:1px solid ' + FT_ThemeProperties.background;
            paginationDiv.appendChild(prevBtn);
            
        }
        var totalPages = FT_getCategoryTruckCount(categoryName);
        
        if(isPgFilterApply){
            totalPages = totalPageNo;
        }

        var paginationTextSpan = document.createElement('span');
        
        var paginationText1 = document.createTextNode(FT_translatableStrings['paginationText1'] + ' ');
        var paginationText2 = document.createTextNode(pageNumber);
        var paginationText3 = document.createTextNode(' ' + FT_translatableStrings['paginationText2'] + ' ' + totalPages);
        paginationTextSpan.appendChild(paginationText1);
        
        
        //create a select list of pages to navigate between pages
        if (totalPages > 1) {
            var paginationSelect = document.createElement('select');
            paginationSelect.className = 'FT_pageSelect';
            for (var i = 1; i <= totalPages; i++) {
                var pageOption = document.createElement('option');
                pageOption.value = i;
                pageOption.text = i;
                if (i == pageNumber) pageOption.selected = true;
                FT_setAttributes(pageOption, { "category": categoryName, "page": i, "translatedcat": translatedCatName });
                paginationSelect.appendChild(pageOption);
            }
            paginationTextSpan.appendChild(paginationSelect);
            
            paginationSelect.addEventListener(
                'change',
                function () { 
                    isIndexPage = true;
                    FT_expandSearchCategory(this.options[this.selectedIndex], false); },
                false
            );
        } else {
            paginationTextSpan.appendChild(paginationText2);
        }
        paginationTextSpan.appendChild(paginationText3);
        
        paginationDiv.appendChild(paginationTextSpan);
        

        if (parseInt(pageNumber) + 1 <= totalPages) {
            var nextBtn = document.createElement('a');
            nextBtn.className = 'FT_PageNext FT_PaginaionBtn';
            FT_setAttributes(nextBtn, { "category": categoryName, "page": parseInt(pageNumber) + 1, "translatedcat": translatedCatName });
            //nextBtn.setAttribute('category', categoryName);
            var btnText = document.createTextNode(FT_translatableStrings['paginationNextText']);
            nextBtn.appendChild(btnText);
            nextBtn.style.cssText = 'color:' + FT_ThemeProperties.color + '; background:' + FT_ThemeProperties.background + '; border:1px solid ' + FT_ThemeProperties.background;
            paginationDiv.appendChild(nextBtn);
        }

        containerDiv.appendChild(paginationDiv);

        FT_BMFA_TruckContainer.appendChild(containerDiv);
        FT_addPageFooter(FT_BMFA_TruckContainer);
        // FT_bindEvent('click', FT_getTruckSearchDetails, FT_BMFA_TruckContainer.querySelectorAll('img'));
        
        FT_bindEvent('click', FT_getTruckSearchDetails, document.getElementsByClassName('FT_truckList')[0].querySelectorAll('img'));
        FT_bindEvent('click', FT_getTruckSearchDetails, FT_BMFA_TruckContainer.querySelectorAll('a.FT_redBtn'));

        //bind pagination events
        if(!isPgFilterApply){
            
            FT_bindEvent('click', FT_expandCategory, FT_BMFA_TruckContainer.querySelectorAll('a.FT_PaginaionBtn'));
        }else{
            
            FT_bindEvent('click', FT_expandSearchCategory, FT_BMFA_TruckContainer.querySelectorAll('a.FT_PaginaionBtn'));
        }
        //FT_bindEvent('change', FT_expandCategory, FT_BMFA_TruckContainer.querySelectorAll('.FT_pageSelect'));

        //call lazy load
        FT_setLazyLoad();
        /* Scroll to top at start of truck container div */
        if (!FT_isSafariOrIos()) { //avoid scroll top for safari
            FT_scrollTop();
        }
    }else{

        FT_closeFilterMenu(null);
        
        //navigate to All category trucks page if no search results found when going back to truck list page
        if( fromBackButton ) {
            var div = document.createElement('div');
            var translatedCatName = FT_getCatTranslatedName( 'All' );
            console.log('translatedCatName::::',translatedCatName);
            FT_setAttributes( div, { 'category' : 'All', 'page' : 1, 'translatedCat' : translatedCatName } );
            var historyUrl = window.location.href;
            var urlParams = { category: 'All' }
            for(var param in urlParams) {
                historyUrl = FT_SetURLParam( historyUrl, param, encodeURIComponent( urlParams[param] ) );
            }

            historyUrl = FT_removeUrlParam( 'stockno', historyUrl );

            history.pushState({ page : 'categoryDetail',category : 'All', 'translatedCat' : translatedCatName }, null, historyUrl);

            FT_expandCategory( div, true );

        } else {
            var divElement = document.getElementById("truckMsg");

            var msgBody = '<span class="closebtn" onclick="this.parentElement.style.display=\'none\';">&times;</span>'+FT_translatableStrings['searchNoResultsMsgPart1']+' <b>"'+searchTerm+'"</b> '+FT_translatableStrings['searchNoResultsMsgPart2'];

            divElement.innerHTML = msgBody.trim();

            divElement.style.display = 'block';

        }   

    }
}

function onPrevClick(){
    
    isPrevious = true;
}

/* Function to dosplay server error */
function FT_displayServerError( messageTransKey, actualErrorMessage ) {

    var containerDiv = document.createElement('div');
    containerDiv.className = 'FT_container';

    var titleDiv = document.createElement('div');
    titleDiv.className = 'FT_PageTitle';
    titleDiv.innerHTML = FT_translatableStrings[messageTransKey];

    containerDiv.appendChild(titleDiv);
    FT_clearContainerDom();
    FT_BMFA_TruckContainer.appendChild(containerDiv);
    FT_addPageFooter(FT_BMFA_TruckContainer);

    //call siteDownAlert web service to send email of failure
    if( typeof actualErrorMessage != 'undefined' && actualErrorMessage != '' ) {
    	FT_callSiteDownAlertService( actualErrorMessage );
	}
}

function FT_MapTranslatedObject( translatedTextObj, obj ) {
    //console.log('translatedTextObj: ',translatedTextObj);
    for (var key in obj) {
        if( typeof translatedTextObj[key] != 'undefined' ) {
            //console.log('key: ',key, translatedTextObj[key]);
            if( key == 'Name' ) {
                obj['originalName'] = obj['Name'];
            }
            obj[key] = translatedTextObj[key];
        }
        if(obj[key] !== null && typeof obj[key] === "object") {
            // Recurse into children
            FT_MapTranslatedObject(translatedTextObj, obj[key]);
        } 
    }
    return obj;
}

function FT_setTranslatedData( translatedTextArr, sentData ) {
    for( var i = 0; i < sentData.length; i++ ) {
        sentData[i] = FT_MapTranslatedObject( translatedTextArr[i], sentData[i] );
    }   
    return sentData;
}

var FT_processTranslation = function( xhttp, additionalParams ) {
    var originalData = additionalParams.originalData;
    var pageName = additionalParams.pageName;
    if ( xhttp && xhttp.readyState == 4 && xhttp.status == 200 ) {
        try {
            //var serverResponse = JSON.parse(xhttp.responseText);
            //console.log('serverResponse',JSON.parse(xhttp.responseText));
            /*if(serverResponse.Success) {*/
                var translatedData = JSON.parse(JSON.parse(xhttp.responseText));
                //console.log('parsed Data: ',translatedData);
                truckData = FT_setTranslatedData( translatedData, originalData );
                //console.log( 'After translation data : ', truckData );

                if( pageName == 'categoriesPage' ) {                    
                    //FT_categoryMap = truckData.reverse();
                    FT_categoryMap = truckData;

                    /* static strings translation */
                    var translatedDataLen = parseInt(translatedData.length-1);
                    if( translatedData[translatedDataLen] ) {
                        FT_translatableStrings = translatedData[translatedDataLen]; 
                        //console.log('static texts: ',translatedData[translatedDataLen]);
                        FT_putDataInCache( { 'FT_translatableStrings' : FT_translatableStrings } ); 
                    } else {
                        console.log("Error accoured while translating static strings");
                    }   

                    FT_processMainPage();                                   
                } else if( pageName == 'truckListingPage' ) {
                    var categoryName = additionalParams.categoryName;
                    var pageNumber = additionalParams.pageNumber;
                    var translatedCatName = additionalParams.translatedCat;
                    //put translated data in cache
                    FT_PutPageTrucksInCache( truckData, pageNumber, categoryName );
                    //display data on page
                    FT_processTruckList( truckData, categoryName, pageNumber, translatedCatName );
                } else if( pageName == 'truckDetailPage' ) {
                    var truck = additionalParams.truck;
                    FT_prepareTruckDetails( truck );
                } else if( pageName == 'searchListingPage' ) {
                    var translatedCatName = additionalParams.translatedCat;
                    //display data on page
                    FT_processSearchTruckList( truckData, translatedCatName, false );
                } else {
                    FT_processMainPage();   
                }
            /*} else {
                console.log('Server Error Message : ', serverResponse.Message);
            }*/
        } catch(exp) {
            FT_displayServerError( 'serverErrorMessage', 'Exception occured while performing translaction : '+exp.message );
            console.log('Parsing Error Message : ', exp.message);
        }
    }
}

function iterateObject( obj, idx ) {
    for (var key in obj) {
        if( FT_translatableFields.indexOf(key) > -1 ) {
            if( !FT_dataToTranslate[idx] ) FT_dataToTranslate[idx] = {};
            FT_dataToTranslate[idx][key] = obj[key];        
        }
        if (obj[key] !== null && typeof obj[key] === "object") {
            // Recurse into children
            iterateObject( obj[key], idx );
        } 
    }
}
/* Translation functions */
function FT_createTranslationData( arr ) {  
    for( var i = 0; i < arr.length; i++ ) {
        iterateObject( arr[i], i );
    }  
}

/* A function handle 'GET' response from request. 
 * @Param xhttp : holding instance of XMLHttpRequest.
 */
var FT_processTruckData = function(xhttp) {
    if ( xhttp && xhttp.readyState == 4 && xhttp.status == 200 ) {
        try {
            var serverResponse = JSON.parse(xhttp.responseText);
            if(serverResponse.Success) {

                var firstParse = JSON.parse( serverResponse.Data );

                if( FT_isJSON( firstParse ) ) {

                    var truckData = JSON.parse( firstParse );
                    console.log('FT_processTruckData: ',truckData);

                    if( truckData.isSuccess ) {
                        /* Dynamic header and footer text from Dealer FTF Account object fields */
                        if( truckData.record ) {
                            FT_setAccountRecordGlobals( truckData.record );
                        }
                        languageCode = truckData.strLanguageCode;
                        if( languageCode == null || typeof languageCode == 'undefined' ) {
                            languageCode = 'en';
                        }
                        console.log('languageCode: ',languageCode);
                        isDisplayTruckPricing = truckData.isDisplayTruckPricing;
                                                    
                        //put pagesize in cache
                        var pgSize = FT_BMFA_TruckContainer.getAttribute('pageSize');
                        if( isNaN(pgSize) || pgSize == 0 || pgSize < 0 || pgSize == null || typeof pgSize == 'undefined' ) pgSize = 10;
                        var dataToAddInCache = { 'FT_pageSize' : pgSize };
                        if( truckData.record ) {
                            dataToAddInCache[ 'FT_dealerAccountRecord' ] = truckData.record;
                        }
                        FT_putDataInCache( dataToAddInCache );
                        
                        var allCategories = truckData.recordList;
                        if( allCategories.length > 0 ) {
                            allCategories.reverse();
                        }
                        //if language code is different than english then request translated data from server
                        if( languageCode != 'en' ) {
                            FT_dataToTranslate = [];
                            FT_createTranslationData( allCategories );
                            //console.log( 'FT_dataToTranslate: ', FT_dataToTranslate );
                            FT_dataToTranslate.push(FT_translatableStrings);
                            console.log( 'FT_dataToTranslate: ', FT_dataToTranslate );
                            var callbackAdditionalParams = { originalData : allCategories, pageName : 'categoriesPage' };
                            FT_WebRequestHandler.postRequestCustom( JSON.stringify(FT_dataToTranslate), translationApiLink+'?language='+languageCode, FT_processTranslation, callbackAdditionalParams );
                        } else {
                            //store category map into a global variable for further use
                            console.log('truckData.recordList::',allCategories);
                            if( allCategories.length ) {
                                //FT_categoryMap = truckData.recordList.reverse();
                                FT_categoryMap = allCategories;
                            } else {
                                FT_categoryMap = allCategories;
                                FT_displayServerError( 'noRecordsMessage' );
                            }   
                            FT_processMainPage();
                        }                          
                    } else {
                        FT_displayServerError( 'serverErrorMessage', 'Error occurred while fetching truck categories : '+truckData.strMessage );
                        console.log('Server Error Message : ', truckData.strMessage );
                    }   
                } else {
                    console.log( 'Error: ',firstParse[0].message );
                    FT_callSiteDownAlertService( 'Error occurred while fetching truck categories : '+firstParse[0].message );
                }
                
            } else {
                FT_displayServerError( 'serverErrorMessage', 'Error occurred while fetching truck categories : '+serverResponse.Message );
                console.log('Server Error Message : ', serverResponse.Message);
            }
        } catch(exp) {
            FT_displayServerError( 'serverErrorMessage', 'Exception occurred while fetching truck categories : '+ exp.message );
            console.log('Parsing Error Message : ', exp.message );
        }
    }
}

var FT_IsTrucksPageCatched = function( categoryName, pageNumber ) {
    /*Check if indexedDB categoryName_pageNumber exists : if not fech data from server else from cache*/
    var promise = new Promise( function(resolve, reject) {
        if( FT_idbSupported && FT_isIndexedDbCreated ) {
            var transaction = FT_idxDb.transaction(["FT_trucks"],"readwrite");
            if( transaction ) {
                var objectStore = transaction.objectStore("FT_trucks");
                if( objectStore ) {
                    var idxDbKey = FT_removeSpecialChars(categoryName);
                    idxDbKey = idxDbKey+'_'+pageNumber;
                    var req = objectStore.openCursor(idxDbKey);
                    req.onsuccess = function(e) {
                        var cursor = e.target.result;
                        if (cursor) { // key already exist
                            /*if differnce between current time and time at which data is cached  
                            is more than one hr then fech new data from server else use cached data*/
                            var ob = objectStore.get("FT_dataSavedTime");
                            if( ob ) {
                                ob.onsuccess = function(e) {
                                    var dataSavedTimeStamp = e.target.result;
                                    var currentTimeStamp = FT_getCurrentTimeStamp();
                                    var timeDifference = currentTimeStamp - dataSavedTimeStamp;
                                    var hoursDifference = Math.floor(timeDifference/1000/60/60);

                                    /*var minutesDifference = Math.floor(timeDifference/1000/60);
                                    console.log('minutesDifference',minutesDifference);
                                    if( minutesDifference < 1 ) {*/

                                    if( hoursDifference < 1 ) {
                                        resolve(true);
                                    }
                                    else {
                                        resolve(false);
                                    }
                                }
                                ob.onerror = function(e) {
                                    resolve(false);
                                }
                            } else {
                                resolve(false);
                            }                                                           
                        } else { // key not exist
                            resolve(false);
                        }
                    }
                    req.onerror = function(e) {
                        resolve(false);     
                    }
                } else {
                    resolve(false);
                }  
            } else {
                resolve(false);
            } 
        } else {
            resolve(false);
        }
    });
    return promise;
}

var FT_processCustomTranslation = function( xhttp, additionalParams ) {
    if ( xhttp && xhttp.readyState == 4 && xhttp.status == 200 ) {
        try {
            var originalData = additionalParams.originalData;
            //var serverResponse = JSON.parse(xhttp.responseText);
            //console.log('serverResponse',JSON.parse(xhttp.responseText));

            var firstParse = JSON.parse( xhttp.responseText );

            if( FT_isJSON( firstParse ) ) {

                var translatedData = JSON.parse( firstParse );
                truckData = FT_setTranslatedData( translatedData, originalData );
                //console.log( 'After translation data : ', truckData );

                /* static strings translation */
                var translatedDataLen = parseInt(translatedData.length-1);
                if( translatedData[translatedDataLen] ) {
                    FT_translatableStrings = translatedData[translatedDataLen]; 
                    //console.log('static texts: ',translatedData[translatedDataLen]);  
                    FT_putDataInCache( { 'FT_translatableStrings' : FT_translatableStrings }  );
                } else {
                    console.log("Error occurred while translating static strings");
                }   

                //store category map into a global variable for further use
                FT_categoryMap = truckData;
                FT_prepareCatTruckCountMap( FT_categoryMap );
                if( FT_categoryMap.length && typeof isDisplayTruckPricing != 'undefined' && languageCode 
                     ) {
                    if( FT_idbSupported ) {
                        FT_putCategoryMapInCache( FT_categoryMap, isDisplayTruckPricing, languageCode );  
                    }                      
                }
                                
            } else {
                console.log( 'Error: ',firstParse[0].message );
                FT_callSiteDownAlertService( 'Error occurred while doing translation : '+firstParse[0].message );
            }
                   
        } catch(exp) {
            FT_displayServerError( 'serverErrorMessage', 'Exception occurred while doing translation : '+exp.message  );
            console.log('Parsing Error Message : ', exp.message);
        }
    }
}

function FT_refreashTruckCountMap( xhttp ) {
    if ( xhttp && xhttp.readyState == 4 && xhttp.status == 200 ) {
        try {
            var serverResponse = JSON.parse(xhttp.responseText);
            if(serverResponse.Success) {

                var firstParse = JSON.parse( serverResponse.Data );

                if( FT_isJSON( firstParse ) ) {

                    var truckData = JSON.parse( firstParse );
                    console.log('FT_refreashTruckCountMap truckData: ',truckData);
                    /* Dynamic header and footer text from Dealer FTF Account object fields */
                    if( truckData.isSuccess ) {
                        if( truckData.record ) {
                            FT_setAccountRecordGlobals( truckData.record );
                        }
                        isDisplayTruckPricing = truckData.isDisplayTruckPricing;
                        languageCode = truckData.strLanguageCode;
                        
                        if( languageCode == null || typeof languageCode == 'undefined' ) {
                            languageCode = 'en';
                        }
                        //put pagesize in cache
                        var pgSize = FT_BMFA_TruckContainer.getAttribute('pageSize');
                        if( isNaN(pgSize) || pgSize == 0 || pgSize < 0 || pgSize == null || typeof pgSize == 'undefined' ) pgSize = 10;
                        var dataToAddInCache = { 'FT_pageSize' : pgSize };
                        if( truckData.record ) {
                            dataToAddInCache[ 'FT_dealerAccountRecord' ] = truckData.record;
                        }
                        FT_putDataInCache( dataToAddInCache );
                        if( languageCode != 'en' ) {
                            FT_dataToTranslate = [];
                            FT_createTranslationData( FT_categoryMap );
                            //console.log( 'FT_dataToTranslate: ', FT_dataToTranslate );
                            //send static strings for translation
                            FT_dataToTranslate.push(FT_translatableStrings);
                            var callbackAdditionalParams = { originalData : truckData.recordList };
                            FT_WebRequestHandler.postRequestCustom( JSON.stringify(FT_dataToTranslate), translationApiLink+'?language='+languageCode, FT_processCustomTranslation, callbackAdditionalParams );
                        } else {
                            //store category map into a global variable for further use
                            if( truckData.recordList.length ) {
                                //FT_categoryMap = truckData.recordList.reverse();
                                FT_categoryMap = truckData.recordList;
                            } else {
                                FT_categoryMap = truckData.recordList;
                            }   
                            FT_prepareCatTruckCountMap( FT_categoryMap );
                            if(FT_categoryMap.length) {
                                if( FT_idbSupported ) {
                                    FT_putCategoryMapInCache( FT_categoryMap, isDisplayTruckPricing, languageCode );  
                                }                      
                            }       
                        } 

                    } else {
                        FT_displayServerError( 'serverErrorMessage', 'Error occurred while fetching truck categories : '+truckData.strMessage );
                        console.log( 'Error: ',truckData.strMessage );                      
                    }
                                    
                } else {
                    FT_displayServerError('serverErrorMessage', 'Error occurred while fetching truck categories : '+firstParse[0].message );
                    console.log( 'Error: ',firstParse[0].message );
                }

            } else {
                FT_displayServerError('serverErrorMessage', 'Error occurred while fetching truck categories : '+serverResponse.Message );
                console.log('Server Error Message : ', serverResponse.Message );
            }
        } catch(exp) {
            FT_displayServerError( 'serverErrorMessage', 'Exception occurred while fetching truck categories : '+exp.message );
            console.log('Parsing Error Message : ', exp.message);
        }
    }
}

/* A function for expand purticuler category. 
 * @Param element   : holding instance of category DOM-element that is currently selected by User.
 */
var FT_processPageTruckData = function( xhttp, additionalParams ) {
    if ( xhttp && xhttp.readyState == 4 && xhttp.status == 200 ) {
        try {
            var categoryName = additionalParams.cat;
            var pageNumber = additionalParams.pageNum;
            var translatedCatName = additionalParams.translatedCat;
            var serverResponse = JSON.parse(xhttp.responseText);
            if(serverResponse.Success) {

                var firstParse = JSON.parse( serverResponse.Data );

                if( FT_isJSON( firstParse ) ) {

                    var truckData = JSON.parse( firstParse );
                    console.log('FT_processPageTruckData : ',truckData);

                    if( truckData.isSuccess ) {
                        var trucks = truckData.recordList;
                        console.log('Page trucks: ',trucks);
                        /* check if language is different than english if so then request for language translation */
                        if( languageCode != 'en' ) {
                            FT_dataToTranslate = [];
                            FT_createTranslationData( trucks );
                            console.log( 'FT_dataToTranslate: ', FT_dataToTranslate );
                            var callbackAdditionalParams = { originalData : trucks, pageName: 'truckListingPage', categoryName: categoryName, pageNumber: pageNumber, translatedCat : translatedCatName };
                            FT_WebRequestHandler.postRequestCustom( JSON.stringify(FT_dataToTranslate), translationApiLink+'?language='+languageCode, FT_processTranslation, callbackAdditionalParams );
                        } else {
                            //put trucks in cache page number wise
                            FT_PutPageTrucksInCache( trucks, pageNumber, categoryName );
                            FT_processTruckList(trucks, categoryName, pageNumber, translatedCatName);
                        }
                    } else {
                        FT_displayServerError( 'serverErrorMessage', 'Error occurred while displaying page trucks: '+truckData.strMessage );
                        console.log( 'Error: ',truckData.strMessage );  
                    }                   
                                    
                } else {
                    FT_displayServerError( 'serverErrorMessage', 'Error occurred while displaying page trucks: '+firstParse[0].message );
                    console.log( 'Error: ',firstParse[0].message );
                }
                
            } else {
                FT_displayServerError( 'serverErrorMessage', 'Error occurred while displaying page trucks: '+serverResponse.Message );
                console.log('Server Error Message : ', serverResponse.Message);
            }
        } catch(exp) {
            FT_displayServerError( 'serverErrorMessage', 'Exception occurred while displaying page trucks: '+exp.message );
            console.log('Parsing Error Message : ', exp.message);
        }
    }
}

function FT_SearchTruckPaginationResult( categoryName, fromBackButton ){
    
    var currentPageNo = pgFilter['page'];
    
    if(currentPageNo){
        var pageNo = 1;
        
        if(isPrevious){                     
            pageNo = parseInt(currentPageNo) - 1;
        }else{
            pageNo = parseInt(currentPageNo) + 1;
        }
        isPrevious = false;
        pgFilter['page'] = ''+pageNo;
        
        if(pageNo > 1){                     
            navigatedFromCategories = false;
        }
        
        
    }
    console.log('pgFilter ::::',pgFilter);
    
    //request search data from server
    FT_requestSearchTrucks( JSON.stringify(pgFilter), fromBackButton );
}


/* A function for search truck. 
* @Param element   : holding instance of category DOM-element that is currently selected by User.
*/
function FT_processPageTruckSearchData( serverResponse, fromBackButton ) {
    
    try {                        
        var translatedCatName = pgFilter['ApparatusType'];

        var firstParse = JSON.parse( serverResponse.Data );

        if( FT_isJSON( firstParse ) ) {

            var truckData = JSON.parse( firstParse );
            console.log('FT_processPageTruckSearchData: ', truckData);

            if( truckData.isSuccess ) {
                totalPageNo = truckData.totalPages;
                console.log('totalPageNo ::::::',totalPageNo);
                
                var trucks = truckData.recordList;
                console.log('Page search trucks: ', trucks);
                /* check if language is different than english if so then request for language translation */
                if (languageCode != 'en') {
                    FT_dataToTranslate = [];
                    FT_createTranslationData(trucks);
                    console.log('FT_dataToTranslate: ', FT_dataToTranslate);

                    var callbackAdditionalParams = { originalData : trucks, pageName: 'searchListingPage', categoryName: translatedCatName, pageNumber: pgFilter['page'], translatedCat : translatedCatName };

                    FT_WebRequestHandler.postRequestCustom(JSON.stringify(FT_dataToTranslate), translationApiLink + '?language=' + languageCode, FT_processTranslation, callbackAdditionalParams);
                } else {
                    FT_processSearchTruckList( trucks, translatedCatName, fromBackButton );
                }
            } else {
                FT_displayServerError( 'serverErrorMessage', 'Error occurred while displaying search page trucks: '+truckData.strMessage );
                console.log( 'Error: ',truckData.strMessage );
            }

        } else {
            FT_displayServerError( 'serverErrorMessage','Error occurred while displaying search page trucks: '+firstParse[0].message );
            console.log( 'Error: ',firstParse[0].message );
        }
        
    } catch (exp) {
        FT_displayServerError( 'serverErrorMessage', 'Exception occurred while displaying search page trucks: '+exp.message );
        console.log('Parsing Error Message : ', exp.message);
    }                
}
function FT_getCatchedPageTrucks( pageNumber, categoryName ) {
    /* Fetch data from indexedDB cache */
    var dbResults = {}; 
    var dbFetchError = false;
    var promise = new Promise( function( resolve, reject ) {
        if( FT_idbSupported && FT_isIndexedDbCreated ) {
            var transaction = FT_idxDb.transaction(["FT_trucks"],"readwrite");
            if( transaction ) {
                var store = transaction.objectStore("FT_trucks");
                if( store ) {
                    var idxDbKey = FT_removeSpecialChars(categoryName);
                    idxDbKey = idxDbKey+'_'+pageNumber;
                    var ob = store.get(idxDbKey);
                    if( ob ) {
                        ob.onsuccess = function(e) {
                            dbResults = e.target.result;
                            resolve(dbResults);
                            //get the key from db whether to display truck price or not
                            /*var obj = store.get("FT_isDisplayTruckPricing");
                            if( obj ) {
                                obj.onsuccess = function(e) {
                                    isDisplayTruckPricing = e.target.result;
                                    resolve(dbResults);
                                }
                            }*/
                        }
                        ob.onerror = function(e) {
                            //console.log("error in getting db key: ");
                            reject("error in getting db key");
                        }
                    } else
                    dbFetchError = true;
                } else
                    dbFetchError = true;
            } else
                dbFetchError = true;        
        } else {
            dbFetchError = true;
        }     
        if( dbFetchError )
            resolve(false); 
    });
    return promise;
}

var FT_processCachedPageTruckData = function( categoryName, pageNumber, translatedCatName ) {
    FT_getCatchedPageTrucks( pageNumber, categoryName ).then( function( trucks ) {
        if( trucks ) {
            FT_processTruckList( trucks, categoryName, pageNumber, translatedCatName );
        } else { //if no data returned from cache then request to server
            //show loader before requesting data from server
            FT_BMFA_TruckContainer.innerHTML = FT_LoaderHtml.FT_format([FT_ThemeProperties.background, FT_translatableStrings['loaderText']]);
            //request data from server
            var additionalParam = { cat : categoryName, pageNum: pageNumber, translatedCat : translatedCatName };
            FT_WebRequestHandler.getPageRequest( FT_processPageTruckData, additionalParam );
        }
    }, function(error) {
        console.log('Error while getting trucks data from indexedDB: ',error);
        FT_callSiteDownAlertService( 'Error while getting trucks data from browser cache : '+error );
    }); 
}

var FT_displayTruckDetails = function( xhttp, additionalParams ) {
    if ( xhttp && xhttp.readyState == 4 && xhttp.status == 200 ) {
        try {
            var serverResponse = JSON.parse(xhttp.responseText);
            if(serverResponse.Success) {

                var firstParse = JSON.parse( serverResponse.Data );

                if( FT_isJSON( firstParse ) ) {

                    var truckData = JSON.parse( firstParse );
                    console.log( 'FT_displayTruckDetails: ', truckData );
                    if( truckData.isSuccess ) {
                        var trucks = truckData.recordList;
                        console.log( 'trucks: ', trucks );
                        if( trucks && trucks.length > 0 ) {
                            truck = trucks[0];
                            console.log( 'truck: ', truck, 'languageCode at truck details: ', languageCode  );
                            if( languageCode != 'en' ) {
                                FT_dataToTranslate = [];
                                FT_createTranslationData( trucks );
                                //console.log( 'FT_dataToTranslate: ', FT_dataToTranslate );
                                var callbackAdditionalParams = { originalData : trucks, pageName: 'truckDetailPage', truck: truck };
                                FT_WebRequestHandler.postRequestCustom( JSON.stringify(FT_dataToTranslate), translationApiLink+'?language='+languageCode,FT_processTranslation, callbackAdditionalParams );
                            } else {
                                FT_prepareTruckDetails( truck );
                            }                   
                        }
                        else {
                            FT_displayServerError('notFoundError');
                            console.log('Truck not found'); 
                        }                      
                    } else {
                        FT_displayServerError( 'serverErrorMessage', 'Error occurred while displaying truck details: '+truckData.strMessage );
                        console.log( 'Error: ',truckData.strMessage );
                    }

                } else {
                    FT_displayServerError( 'serverErrorMessage', 'Error occurred while displaying truck details: '+firstParse[0].message );
                    console.log( 'Error: ',firstParse[0].message );
                }

                 
            } else {
                FT_displayServerError( 'serverErrorMessage', 'Error occurred while displaying truck details: '+serverResponse.Message );
                console.log('Server Error Message : ', serverResponse.Message);
            }
        } catch(exp) {
            FT_displayServerError( 'serverErrorMessage', 'Exception occurred while displaying truck details: '+exp.message );
            console.log('Parsing Error Message : ', exp.message);
        }
    }
}
var FT_displayTruckSearchDetails = function (xhttp, additionalParams) {
        if (xhttp && xhttp.readyState == 4 && xhttp.status == 200) {
            try {
                var serverResponse = JSON.parse(xhttp.responseText);
                if (serverResponse.Success) {

                    var firstParse = JSON.parse( serverResponse.Data );

                    if( FT_isJSON( firstParse ) ) {

                        var truckData = JSON.parse( firstParse );
                        console.log('FT_displayTruckSearchDetails: ', truckData);
                        if( truckData.isSuccess ) {
                            var trucks = truckData.recordList;
                            console.log('trucks: ', trucks);
                            if (trucks && trucks.length > 0) {
                                truck = trucks[0];
                                console.log('truck: ', truck, 'languageCode at truck details: ', languageCode);
                                if (languageCode != 'en') {
                                    FT_dataToTranslate = [];
                                    FT_createTranslationData(trucks);
                                    //console.log( 'FT_dataToTranslate: ', FT_dataToTranslate );
                                    var callbackAdditionalParams = { originalData: trucks, pageName: 'truckDetailPage', truck: truck };
                                    FT_WebRequestHandler.postRequestCustom(JSON.stringify(FT_dataToTranslate), translationApiLink + '?language=' + languageCode, FT_processTranslation, callbackAdditionalParams);
                                } else {
                                    FT_prepareTruckSearchDetails(truck);
                                }
                            }
                            else {
                                FT_displayServerError('notFoundError');
                                console.log('Truck not found');
                            }
                        } else {
                            FT_displayServerError( 'serverErrorMessage', truckData.strMessage );
                            console.log( 'Error: ', 'Error occurred while displaying searched truck details: '+truckData.strMessage );
                        }

                    } else {
                        FT_displayServerError( 'serverErrorMessage', 'Error occurred while displaying searched truck details: '+firstParse[0].message );
                        console.log( 'Error: ', firstParse[0].message );
                    }
                    
                } else {
                    FT_displayServerError( 'serverErrorMessage', 'Error occurred while displaying searched truck details: '+serverResponse.Message );
                    console.log('Server Error Message : ', serverResponse.Message);
                }
            } catch (exp) {
                FT_displayServerError( 'serverErrorMessage', 'Exception occurred while displaying searched truck details: '+exp.message );
                console.log('Parsing Error Message : ', exp.message);
            }
        }
    }
function FT_requestTruckDetails( translatedCatName ) {
    
    //refreash category truck count map
    FT_WebRequestHandler.getRequest( FT_refreashTruckCountMap );
    //show loader before requesting data from server
    FT_BMFA_TruckContainer.innerHTML = FT_LoaderHtml.FT_format( [ FT_ThemeProperties.background, FT_translatableStrings['loaderText'] ] );
    //set last selected category to all
    var catDiv = document.createElement( 'div' );
    //catDiv.setAttribute('category',categoryName);
    FT_setAttributes( catDiv, { 'category' : 'All', 'page' : 1, 'translatedCat' : translatedCatName } );
    FT_lastCategorySelected = catDiv;
    //request data from server
    var additionalParam = { cat : 'All', pageNum: 1, stockn : FT_URLParam.stockno };
    FT_WebRequestHandler.getPageRequest( FT_displayTruckDetails, additionalParam );
}
function FT_getPageTruckData( categoryName, pageNumber, translatedCatName ) {
    //show loader before requesting data from server
    FT_BMFA_TruckContainer.innerHTML = FT_LoaderHtml.FT_format([FT_ThemeProperties.background, FT_translatableStrings['loaderText']]);
    //request data from server
    var additionalParam = { cat : categoryName, pageNum: pageNumber, translatedCat : translatedCatName };
    
    console.log('additionalParam ::::',additionalParam);
    console.log('FT_processPageTruckData ::::',FT_processPageTruckData);
    FT_WebRequestHandler.getPageRequest( FT_processPageTruckData, additionalParam ); 
}

function FT_getPageSearchTruckData( categoryName, pageNumber, translatedCatName ) {
    //show loader before requesting data from server
    FT_BMFA_TruckContainer.innerHTML = FT_LoaderHtml.FT_format([FT_ThemeProperties.background, FT_translatableStrings['loaderText']]);
    //request data from server
    var additionalParam = { cat : categoryName, pageNum: pageNumber, translatedCat : translatedCatName };
    
    console.log('additionalParam ::::',additionalParam);
    console.log('FT_processPageTruckData ::::',FT_processPageTruckData);
    FT_WebRequestHandler.getPageRequest( FT_processPageTruckData, additionalParam ); 
}
function FT_expandCategoryDetail( element ) {
    var categoryName = element.getAttribute('category');
    var translatedCatName = element.getAttribute('translatedcat');
    var pageNumber = element.getAttribute('page');
    console.log('selected cat: ',categoryName);
    console.log('translatedCatName: ',translatedCatName);
    if(FT_URLParam.stockno && !FT_lastTruckSelected) {
        //reinitialize indexedDB so that if pagesize is changed in HTML then all page cache should also be cleared 
        if( FT_idbSupported ) {
            FT_reinitializeIndexedDb().then( 
                function() {
                    FT_requestTruckDetails( translatedCatName );
                }, function( error ) {
                    console.log( error );
                    ///else display first page
                    FT_loadCustomTruckData(false);  
                    FT_callSiteDownAlertService( 'Error occurred while fetching trucks category data: '+error );
                }
            ); 
        } else {
            FT_requestTruckDetails( translatedCatName );
        }         
    } else {
        //check if page is catched. if catched then take page data from cache else request from server
        if( FT_idbSupported ) {
            FT_IsTrucksPageCatched(categoryName, pageNumber).then( function(isCached) {
                if( !isCached ) {
                    //request truck count map from server and refreash it in cache
                    //FT_WebRequestHandler.getRequest(FT_refreashTruckCountMap);
                    FT_getPageTruckData( categoryName, pageNumber, translatedCatName );       
                }
                else {
                    FT_processCachedPageTruckData( categoryName, pageNumber, translatedCatName );   
                }
            }, 
            function(error) {
                console.log('error: ',error);
                FT_callSiteDownAlertService( 'Error while getting page trucks from browser cache : '+error );
            });
        } else { //request data from server
            FT_getPageTruckData( categoryName, pageNumber, translatedCatName );  
        }
    }   
}


function FT_expandSearchCategoryDetail( element, fromBackButton ) {
    var categoryName = element.getAttribute('category');
    var translatedCatName = element.getAttribute('translatedcat');
    var pageNumber = element.getAttribute('page');
    
    if(isIndexPage){
        var pageNo = pageNumber - 1;
        pgFilter['page'] = ''+pageNo;
    }
    isIndexPage = false;
    
    FT_SearchTruckPaginationResult( categoryName, fromBackButton );
}

function FT_getDataFromCache( key ) {
    var dbResults = {};
    var promise = new Promise( function(resolve, reject) {
        if( FT_idbSupported && FT_isIndexedDbCreated ) {
            var transaction = FT_idxDb.transaction(["FT_trucks"],"readwrite");
            if( transaction ) {
                var store = transaction.objectStore("FT_trucks");
                if( store ) {
                    var ob = store.get( key );
                    if( ob ) {
                        ob.onsuccess = function(e) {
                            dbResults = e.target.result;
                            resolve(dbResults);
                        }
                        ob.onerror = function(e) {
                            console.log("error in getting db key: ", key);
                            reject("error in getting db key");
                        }
                    } else {
                        reject("indexedDB Error");
                    }
                } else {
                        reject("indexedDB Error");
                }
            } else {
                reject("indexedDB Error");
            }       
        } else {
            reject("indexedDB not supported");
        }
    });
    return promise;
}

function FT_expandCategoryDeep( element ) {
    if(  languageCode && languageCode != 'en' ) {
        if( !FT_isFetchedTranslations ) {
            if( FT_idbSupported ) {
                FT_getDataFromCache( "FT_translatableStrings" ).then( function(result) {
                    FT_translatableStrings = result;
                    FT_isFetchedTranslations = true;
                    FT_expandCategoryDetail( element );
                }, function( error ) {
                    console.log( error );
                    FT_callSiteDownAlertService( 'Error while getting data ( FT_translatableStrings ) from browser cache : '+error );
                    //if error occured whil fetching translations from db then use english data
                    FT_expandCategoryDetail( element );
                });
            } else {
                FT_expandCategoryDetail( element );
            }
        } else {
            FT_expandCategoryDetail( element );
        }
    } else {
        FT_expandCategoryDetail( element );
    }   
}

function FT_expandSearchCategoryDeep( element, fromBackButton ) {
    
    if(  languageCode && languageCode != 'en' ) {
        if( !FT_isFetchedTranslations ) {
            
            FT_expandSearchCategoryDetail( element, fromBackButton );
            
        } else {
            FT_expandSearchCategoryDetail( element, fromBackButton );
        }
    } else {
        FT_expandSearchCategoryDetail( element, fromBackButton );
    }   
}

var FT_resetSearchFilters = function() {    
    isPgFilterApply = false;
    searchTerm = '';
    pgFilter = {};
}

/* doNotResetFilters : Set to true if retuned to truck list from truck detail page and no search results found then All category page is displayed and no filters are cleared */

var FT_expandCategory = function( element, doNotResetFilters ) {

    //reset filters on click of any category
    if( typeof doNotResetFilters == 'undefined' ) {
        FT_resetSearchFilters();
    }

    if( !FT_isFetchedPageSize ) {
        //get page size from cache
        if( FT_idbSupported ) {
            FT_getDataFromCache( "FT_pageSize" ).then( function( result ) {
                pageSize = result;
                FT_isFetchedPageSize = true;
                FT_expandCategoryDeep( element );           
            }, function( error ) {
                console.log( error );   
                FT_callSiteDownAlertService( 'Error while getting data( FT_pageSize ) from browser cache : '+error );
                //even error occured while fetching data from cache continue expanding category page
                FT_expandCategoryDeep( element );
            } );
        } else {
            FT_expandCategoryDeep( element );
        }
    } else {
        FT_expandCategoryDeep( element );
    }   
}

var FT_expandSearchCategory = function( element, fromBackButton ) {
    if( !FT_isFetchedPageSize ) {                    
        FT_expandSearchCategoryDeep( element, fromBackButton );                   
    } else {
        FT_expandSearchCategoryDeep( element, fromBackButton );
    }   
}

function FT_getCategoryMapFromCache() {
    var dbResults = {};
    var promise = new Promise( function(resolve, reject) {
        if( FT_idbSupported && FT_isIndexedDbCreated ) {
            var transaction = FT_idxDb.transaction(["FT_trucks"],"readwrite");
            if( transaction ) {
                var store = transaction.objectStore("FT_trucks");
                if( store ) {
                    var ob = store.get("FT_categoryMapKey");
                    if( ob ) {
                        ob.onsuccess = function(e) {
                            dbResults = e.target.result;
                            //get the key from db whether to display truck price or not
                            var objDisplayPricing = store.get("FT_isDisplayTruckPricing");
                            if( objDisplayPricing ) {
                                objDisplayPricing.onsuccess = function(e) {
                                    isDisplayTruckPricing = e.target.result;
                                    var objLanguageCode = store.get("FT_languageCode");
                                    if( objLanguageCode ) {
                                        objLanguageCode.onsuccess = function(e) {
                                            languageCode = e.target.result; 
                                            resolve(dbResults);
                                        }
                                        objLanguageCode.onerror = function(e) {
                                            reject("Error occured while fetching language code key from cache");
                                        }
                                    }
                                }
                                objDisplayPricing.onerror = function(e) {
                                    reject("Error occured while fetching display truck pricing key from cache");
                                }
                            }
                        }
                        ob.onerror = function(e) {
                            //console.log("error in getting db key: ");
                            reject("error in getting db key");
                        }
                    } else
                    dbFetchError = true;
                } else
                    dbFetchError = true;
            } else
                dbFetchError = true;            
        } else
            dbFetchError = true;
        if( dbFetchError )
            resolve(false);
    });
    return promise;
}
/* Function to set global variables for account record */
var FT_setAccountRecordGlobals = function( accountRecord ) {

    if( accountRecord &&  accountRecord.Dealer_Header__c ) {
        FT_translatableStrings['mainPageTitle'] = accountRecord.Dealer_Header__c;
    }
    if( accountRecord && accountRecord.Dealer_Footer__c ) {
        FT_translatableStrings['footerSellingTxt1'] = accountRecord.Dealer_Footer__c;
    }                    
    if( typeof accountRecord.Display_Contact_Phone_Number__c != 'undefined' ) {
        isDisplayDealerPhone = accountRecord.Display_Contact_Phone_Number__c;
    }
    if( typeof accountRecord.Contact_Phone_Number__c != 'undefined' ) {
        dealerPhoneNumber = accountRecord.Contact_Phone_Number__c;
    }
    if( typeof accountRecord.Header_Description__c != 'undefined' ) {
        FT_translatableStrings['headerDescription'] = accountRecord.Header_Description__c;
    }
    //replace dealerPhone in translatable string with actual account phone from back-end data
    for( var key in FT_translatableStrings ) {
        var strToTranslate = FT_translatableStrings[ key ];
        if( strToTranslate.indexOf( 'dealerPhone' ) != -1 ) {
            strToTranslate = strToTranslate.replace( 'dealerPhone', dealerPhoneNumber );
            FT_translatableStrings[ key ] = strToTranslate;
        }
    }  
    console.log( "FT_translatableStrings after phone replace: ", FT_translatableStrings );
    globalAccountRecord = accountRecord; 
}

/* Function to process cached truck data */
var FT_processCachedTruckData = function() {
    FT_getDataFromCache( "FT_dealerAccountRecord" ).then( function( accountRecord ) {
        
        FT_getCategoryMapFromCache().then( function( categoryMap ) {
            if( categoryMap ) { //if successfully fetched data from cache
                /* set dynamic header and footer text from cached account record of Dealer FTF account object */
                if( languageCode && languageCode == 'en' ) {
                    FT_setAccountRecordGlobals( accountRecord );
                }
                FT_categoryMap = categoryMap; //set global variable
                FT_prepareCatTruckCountMap( FT_categoryMap );
                if( FT_URLParam.category && !FT_URLParam.stockno ) {        
                    var isCatValid = FT_checkValidCategory( decodeURIComponent( FT_URLParam.category ) );
                    var cat = ( isCatValid ) ? decodeURIComponent( FT_URLParam.category ) : 'All';
                    var div = document.createElement('div');
                    var translatedCatName = FT_getCatTranslatedName( cat );
                    console.log('translatedCatName::::',translatedCatName);
                    FT_setAttributes( div, { 'category' : cat, 'page' : 1, 'translatedCat' : translatedCatName } );
                        FT_expandCategory( div );                                                   
                }
                /* If URL has stock no in URL then display truck detail page */
                else if( FT_URLParam.stockno && !FT_lastTruckSelected ) {
                    if( FT_URLParam.category ) {        
                        var isCatValid = FT_checkValidCategory( decodeURIComponent( FT_URLParam.category ) );
                        var cat = ( isCatValid ) ? decodeURIComponent( FT_URLParam.category ) : 'All';
                    } else {
                        var cat = 'All';
                    }
                    var translatedCatName = FT_getCatTranslatedName( cat );
                    //reinitialize indexedDB so that if pagesize is changed in HTML then all page cache should also be cleared 
                    FT_reinitializeIndexedDb().then( 
                        function() {
                            //refreash category truck count map
                            FT_WebRequestHandler.getRequest(FT_refreashTruckCountMap);
                            //show loader before requesting data from server
                            FT_BMFA_TruckContainer.innerHTML = FT_LoaderHtml.FT_format([FT_ThemeProperties.background, FT_translatableStrings['loaderText']]);
                            //set last selected category to all
                            var catDiv = document.createElement('div');
                            //catDiv.setAttribute('category',categoryName);
                            FT_setAttributes( catDiv, { 'category' : cat, 'page' : 1, 'translatedCat' : translatedCatName } );
                            FT_lastCategorySelected = catDiv;
                            //request data from server
                            var additionalParam = { cat : cat, pageNum: 1, stockn : FT_URLParam.stockno };
                            FT_WebRequestHandler.getPageRequest( FT_displayTruckDetails, additionalParam );
                        }, function( error ) {
                            console.log( error );
                            FT_callSiteDownAlertService( "Error while fetching truck categories and it's count : "+error );
                            ///else display first page
                            FT_loadCustomTruckData(false);  
                        }
                    );
                }
                else {
                    //added for history maintainance
                    navigatedFromCategories = true;
                    /* Get static translation from cache */
                    if( languageCode && languageCode != 'en' )  {
                        if( FT_idbSupported ) {
                            FT_getDataFromCache( "FT_translatableStrings" ).then( function(result) {
                                FT_translatableStrings = result;
                                FT_displayCategories( FT_categoryMap ); 
                            }, function( error ) {
                                console.log( error );
                                FT_callSiteDownAlertService( 'Error while getting data( FT_translatableStrings ) from browser cache : '+error );
                                //if error occured whil fetching translations from db then use english data
                                FT_displayCategories( FT_categoryMap ); 
                            }); 
                        } else {
                             FT_displayCategories( FT_categoryMap );   
                        }                                    
                    } else {
                        FT_displayCategories( FT_categoryMap ); 
                    }
                }   
            } else { //if error ocuured while fetching data from cache request data from server
                FT_WebRequestHandler.getRequest(FT_processTruckData);   
            }
        }, function( error ) {
            console.log('Error while getting category map from cache: ',error);
            FT_callSiteDownAlertService( 'Error while getting category map from cache: '+error );
        } );    

    }, function( error ) {
        console.log('Error while getting dealer FTF account record from cache: ',error);
        FT_callSiteDownAlertService( 'Error while getting dealer FTF account record ( FT_dealerAccountRecord ) from cache: '+error );
    });
    
}

/* A function for initialize FT_URLParam Map. */
var FT_GetURLParams = function() {
    for( var param in FT_URLParam) {
        var urlParam = FT_GetParam(window.location.search, param);
        //var urlParam = FT_GetParam(parent.document.location.search, param);
        FT_URLParam[param] = decodeURI( urlParam );
    }
}

/* A function for add dynamic CSS application for variaous website themes. */
var FT_AddDynamicCSS = function() { 
    var DynamicCSSRow = [];
    DynamicCSSRow.push(FT_DynamicTabCSS.FT_format([FT_ThemeProperties.background, FT_ThemeProperties.color]));
    DynamicCSSRow.push(FT_DynamicNxtBtnCSS.FT_format([FT_ThemeProperties.background]));
    DynamicCSSRow.push(FT_DynamicPrvBtnCSS.FT_format([FT_ThemeProperties.background]));
    var isStylePresent = true;
    var style = document.getElementsByTagName('style')[0];
    if(!style) {
        isStylePresent = false;
        style = document.createElement('style');
    }
    DynamicCSSRow.forEach(function(dynamicCSS) {
        if (style.styleSheet) {
            style.styleSheet.cssText += dynamicCSS;
        } else {
            style.appendChild(document.createTextNode(dynamicCSS));
        }
    });
    if(!isStylePresent) {
        document.getElementsByTagName('head')[0].appendChild(style);        
    }
}

var FT_loadCustomTruckData = function(isCached) {
    FT_GetURLParams();
    FT_BMFA_TruckContainer = document.getElementById('dealerTruckContainerId');
    FT_DealerAccointId = FT_BMFA_TruckContainer.getAttribute('accountId');
    isSandbox = FT_BMFA_TruckContainer.getAttribute('isSandbox');
    if( isSandbox == null ) { isSandbox = false; }
    var style = getComputedStyle(FT_BMFA_TruckContainer);
    FT_ThemeProperties.background = style.backgroundColor;
    FT_ThemeProperties.color = style.color;
    FT_BMFA_TruckContainer.innerHTML = FT_LoaderHtml.FT_format([FT_ThemeProperties.background, FT_translatableStrings['loaderText']]);
    FT_BMFA_TruckContainer.className = FT_BMFA_TruckContainer.className.replace('FT_ThemeContainer', '');
    FT_AddDynamicCSS();
    //if data is not cached then get it from server else use cached data
    if( !isCached ) {
        FT_WebRequestHandler.getRequest(FT_processTruckData);
    }
    else {
        FT_processCachedTruckData();
    }
}

var FT_loadCachedTruckData = function() {
    var accountId = document.getElementById('dealerTruckContainerId').getAttribute('accountId');
    //create accountId specific detabases so that cache can maintained per account
    var dbName = (accountId) ? "FT_trucksDb_"+accountId : "FT_trucksDb"; 
    var openRequest = indexedDB.open(dbName);    
    openRequest.onupgradeneeded = function(e) {
        var thisDB = e.target.result;    
        if(!thisDB.objectStoreNames.contains("FT_trucks")) {
            thisDB.createObjectStore("FT_trucks");
        }    
    }    
    openRequest.onsuccess = function(e) {
        //console.log("Success in cache db creation!");
        FT_idxDb = e.target.result;
        FT_isIndexedDbCreated = true;
        /*Check if indexedDB FT_categoryMapKey exists : if not fech data from server else from cache*/
        var transaction = FT_idxDb.transaction(["FT_trucks"],"readwrite");
        if( transaction ) {
            var objectStore = transaction.objectStore("FT_trucks");
            if( objectStore ) {
                var req = objectStore.openCursor("FT_categoryMapKey");
                req.onsuccess = function(e) {
                    var cursor = e.target.result;
                    if (cursor) { // key already exist
                        /*if differnce between current time and time at which data is cached  
                        is more than one hr then fech new data from server else use cached data*/
                        var ob = objectStore.get("FT_dataSavedTime");
                        if( ob ) {
                            ob.onsuccess = function(e) {
                                var dataSavedTimeStamp = e.target.result;
                                var currentTimeStamp = FT_getCurrentTimeStamp();
                                var timeDifference = currentTimeStamp - dataSavedTimeStamp;
                                var hoursDifference = Math.floor(timeDifference/1000/60/60);

                                /*var minutesDifference = Math.floor(timeDifference/1000/60);
                                console.log('minutesDifference',minutesDifference);
                                if( minutesDifference < 1 ) {*/

                                if( hoursDifference < 1 ) {
                                    FT_loadCustomTruckData(true);
                                }
                                else {
                                    /*delete indexed db and reinitialize so that 
                                    pagewise data from cache will also be flushed*/
                                    FT_reinitializeIndexedDb().then( 
                                        function() {
                                            FT_loadCustomTruckData(false);  
                                        }, function( error ) {
                                            console.log( error );
                                            FT_loadCustomTruckData(false);  
                                            FT_callSiteDownAlertService( 'Error occurred while fetching trucks category data: '+error );
                                        }
                                    );                                  
                                }
                            }
                            ob.onerror = function(e) {
                                FT_loadCustomTruckData(false);      
                            }
                        } else {
                            FT_loadCustomTruckData(false);      
                        }                                                           
                    } else { // key not exist
                        FT_loadCustomTruckData(false);
                    }
                }
                req.onerror = function(e) {
                    FT_loadCustomTruckData(false);                  
                }
            } else {
                FT_loadCustomTruckData(false);
            }  
        } else {
            FT_loadCustomTruckData(false);
        }    
    }    
    openRequest.onerror = function(e) {
        console.log("Error: ", e);
        FT_loadCustomTruckData(false);
    }    
}

function FT_isSafariOrIos() {
    var flg = false;
    var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    var safari = /safari/.test( navigator.userAgent ); //for safari browser
    //console.log("safari: ",safari);
    if( iOS || safari ) {
        flg = true;
    }
    return flg;
}
/* A function as entry point for all functionality. 
 * - A div having id 'dealerTruckContainerId', must be present on DOM.
 @isCached : boolean to get if data is catched or not
 */
var FT_loadTruckData = function() {
    /* Check if indexedDB is supported by browser */
    if("indexedDB" in window) {
        if( !FT_isSafariOrIos() ) {
            FT_idbSupported = true;
        }
    }   
    if(FT_idbSupported) { //if indexedDB supported then use cached data
        FT_loadCachedTruckData();       
    } else { //if indexedDB not supported then fech data from server
        FT_loadCustomTruckData(false);
    }   
}

/*History popstate - for back button functionality*/        
window.addEventListener("popstate", function(e) {
    if(e.state !== null) { 
       if(e.state.page == 'categoryListing') {
            FT_displayCategories( FT_categoryMap );            
       } else if(e.state.page == 'categoryDetail') {
            var div = document.createElement('div');
            FT_setAttributes( div, { 'category' : e.state.category, 'page' : 1, 'translatedCat' : e.state.translatedCat } );
            //div.setAttribute('category', e.state.category);
            if(e.state.category) {
                FT_expandCategory( div );
            }
       } else if(e.state.page == 'truckDetail') {
            var div = document.createElement('div');
            div.setAttribute('truckId', e.state.truck);
            if(e.state.truck) {
                //check with this
                FT_getTruckDetails( div );
            }       
       }
   } else {
       window.history.back();
   }
});

/* A function to add Intrest form to DOM. */
var FT_addSellForm = function() {
    var fieldAndType = {
        'First Name':'input',
        'Last Name':'input',
        'Fire Department' : 'input',
        'Email':'input',
        'Phone':'input',
        'State':'select',
        'What year is your truck':'input',
        'What type of truck' : 'select',
        'What brand is your truck' : 'input',
        'When would you like to sell your truck' : 'select',
        'What price is needed for your truck': 'input',
        'Comments':'textarea'
    }
    
    var fieldToClasses = {  
        'First Name': 'FT_input FT_required',
        'Last Name': 'FT_input FT_required',
        'Fire Department' : 'FT_input FT_required',
        'Email': 'FT_input FT_required FT_email',
        'Phone': 'FT_input FT_required',
        'State': 'FT_input FT_required',
        'What year is your truck': 'FT_input',
        'What type of truck' : 'FT_input',
        'What brand is your truck' : 'FT_input',
        'When would you like to sell your truck' : 'FT_input',
        'What price is needed for your truck': 'FT_input',
        'Comments' : 'FT_input'
        
    }
    /* set initial values of form fields */
    var fieldToValues = {
        'First Name': '',
        'Last Name': '',
        'Fire Department' : '',
        'Email': '',
        'Phone': '',
        'State': '',
        'What year is your truck': '',
        'What type of truck' : '',
        'What brand is your truck' : '',
        'When would you like to sell your truck' : '',
        'What price is needed for your truck': '',  
        'Comments' : ''     
    }
    /* get form field values from cookie and if cookie is set then override it's values */
    var sellFormData = FT_getCookie("sellFormData");
    //console.log('sellFormData');
    if( sellFormData != "" ) {
        var frmData = JSON.parse(sellFormData);
        if( frmData['FirstName'] ) fieldToValues['First Name'] = frmData['FirstName']; 
        if( frmData['LastName'] ) fieldToValues['Last Name'] = frmData['LastName'];
        if( frmData['Phone'] ) fieldToValues['Phone'] = frmData['Phone'];
        if( frmData['Email'] ) fieldToValues['Email'] = frmData['Email'];
        if( frmData['FireDepartment'] ) fieldToValues['FireDepartment'] = frmData['FireDepartment'];
        if( frmData['State'] ) fieldToValues['State'] = frmData['State'];
        if( frmData['Whatyearisyourtruck'] ) fieldToValues['What year is your truck'] = frmData['Whatyearisyourtruck']; 
        if( frmData['Whattypeoftruck'] ) fieldToValues['What type of truck'] = frmData['Whattypeoftruck'];  
        if( frmData['Whatbrandisyourtruck'] ) fieldToValues['What brand is your truck'] = frmData['Whatbrandisyourtruck'];  
        if( frmData['Whenwouldyouliketosellyourtruck'] ) fieldToValues['When would you like to sell your truck'] = frmData['Whenwouldyouliketosellyourtruck'];  
        if( frmData['Whatpriceisneededforyourtruck'] ) fieldToValues['What price is needed for your truck'] = frmData['Whatpriceisneededforyourtruck'];         
        if( frmData['Comments'] ) fieldToValues['Comments'] = frmData['Comments'];          
    }
    
    var StateOpt = {
        "United States" : [ 'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'District of Columbia', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming' ],
        "Canada" : [ 'Alberta', 'British Columbia', 'Manitoba', 'Newfoundland / Labrador', 'New Brunswick', 'Nova Scotia', 'Northwest Territories', 'Nunavut', 'Ontario', 'Prince Edward Island', 'Quebec', 'Saskatchewan', 'Yukon' ]
    };

    var BooleanOpt = ['', 'Yes', 'No'];
    
    var truckTypeOpt = ['', 'Used Pumper and Engines', 'Rescue Pumper and Engines', 'Used Aerial, Ladder Trucks and Quints', 'Towers and Platforms', 'Used Tankers and Tenders', 'Used Brush Trucks, Quick Attacks and Mini Pumpers', 'Used Rescue Trucks and Squads', 'Command Units', 'Used ARFF and Airport Crash Trucks', 'Ambulances and Transport Units', 'European Style Units', 'Vocational Trucks'];
    
    var timeForSellOpt = ['', 'Today', '30 Days', 'Maybe 6 Months', 'Probably 1 Year Or More'];
    
    var replacementOpt = ['', 'Yes', 'No', 'Working On It', 'Not Replacing'];   
    
    var sellFormSection = document.createElement('div');
    sellFormSection.id = 'FT_SellSecId';
    //sellFormSection.style.display = 'none';
    sellFormSection.className = 'FT_gryTxt FT_container FT_SellSec';
    
    var formTitleDiv = document.createElement('div');
    var titleText = FT_translatableStrings['sellFormTitle'];
    formTitleDiv.innerHTML = titleText;
    formTitleDiv.className = 'FT_formTitle';
    sellFormSection.appendChild(formTitleDiv);
    
    var formSubTitleDiv = document.createElement('div');
    formSubTitleDiv.className = 'FT_formSubTitle';
    sellFormSection.appendChild(formSubTitleDiv);

    var formWarpper = document.createElement('div');
    formWarpper.className = 'sellFrom';
    var messageContainerDiv = document.createElement('div');
    messageContainerDiv.id = 'sellMessageContainerId';
    messageContainerDiv.classClass = 'FT_closeBtn';
    formWarpper.appendChild(messageContainerDiv);
    var index = 0;
    
    for(var fieldName in fieldAndType) {
        var inputContainer = document.createElement('div');
        inputContainer.className += ((index%2) ? 'FT_fL' : 'FT_fR');
        var dynamicDom = document.createElement(fieldAndType[fieldName]);
        dynamicDom.name = fieldName.replace(/\s/g,'');
        dynamicDom.className = fieldToClasses[fieldName];
        if(fieldName === 'State') {
            dynamicDom.className += ' FT_gryTxt FT_select';
            //default selected option "State"
            var option = document.createElement('option');
            option.value = '';
            option.innerHTML =( typeof FT_translatableStrings[fieldName] != 'undefined' ) ? FT_translatableStrings[fieldName] : fieldName;
            option.disabled = true;
            //option.selected = true; 
            option.setAttribute( "selected", "" );
            dynamicDom.appendChild(option);
            //create option group
            for( var key in StateOpt ) {
                var optGroup = document.createElement('optgroup');
                optGroup.setAttribute( "label", key );
                StateOpt[ key ].forEach( function( opt ) {
                    var option = document.createElement('option');
                    option.value = opt;
                    option.innerHTML = opt;
                    optGroup.appendChild(option);
                });                         
                dynamicDom.appendChild( optGroup );
            }
            FT_bindEvent('change', removeFT_SelectClass, [dynamicDom]);
            
        } else if(fieldName === 'What type of truck') {
            dynamicDom.className += ' FT_gryTxt FT_select';
            truckTypeOpt.forEach(function(opt) {
                var option = document.createElement('option');
                option.value = (opt) ? opt: '';
                option.innerHTML = (opt) ? opt : ( ( typeof FT_translatableStrings[fieldName] != 'undefined' ) ? FT_translatableStrings[fieldName] + '?' : fieldName + '?' );
                if(!opt) {
                    option.disabled = true;
                    option.selected = true;                 
                }
                dynamicDom.appendChild(option);
            });
            
            FT_bindEvent('change', removeFT_SelectClass, [dynamicDom]);
            
        }else if(fieldName === 'When would you like to sell your truck') {
            dynamicDom.className += ' FT_gryTxt FT_select';
            timeForSellOpt.forEach(function(opt) {
                var option = document.createElement('option');
                option.value = (opt) ? opt: '';
                option.innerHTML = (opt) ? opt : ( ( typeof FT_translatableStrings[fieldName] != 'undefined' ) ? FT_translatableStrings[fieldName] + '?' : fieldName + '?' );
                if(!opt) {
                    option.disabled = true;
                    option.selected = true;
                }
                dynamicDom.appendChild(option);
            });
            
            FT_bindEvent('change', removeFT_SelectClass, [dynamicDom]);
        }
        else {
                
            if(fieldName == 'What brand is your truck'){                
                dynamicDom.placeholder = ( typeof FT_translatableStrings[fieldName] != 'undefined' ) ? FT_translatableStrings[fieldName] + '?' : fieldName + '?';
            }else if(fieldName == 'What price is needed for your truck'){               
                dynamicDom.placeholder = ( typeof FT_translatableStrings[fieldName] != 'undefined' ) ? FT_translatableStrings[fieldName] + '?' : fieldName + '?';           
                dynamicDom.className += ' FT_gryTxt FT_select FT_currency';
                FT_bindEvent('keyup', FT_validateCurrency, [dynamicDom]);
                
            }else if(fieldName == 'What year is your truck' ){
                dynamicDom.placeholder = ( typeof FT_translatableStrings[fieldName] != 'undefined' ) ? FT_translatableStrings[fieldName] + '?' : fieldName + '?';                           
                dynamicDom.setAttribute("maxlength", "4");  
                FT_bindEvent('keyup', FT_validateNumberOnly, [dynamicDom]);
                
            }else{
                dynamicDom.placeholder = ( typeof FT_translatableStrings[fieldName] != 'undefined' ) ? FT_translatableStrings[fieldName] : fieldName;   
            }
            
            if(fieldName === 'Phone') {
                FT_bindEvent('keyup', FT_processNumberEntry, [dynamicDom]);
            }
            else if(fieldName === 'Comments') {
                inputContainer.className += 'FT_TextArea';
            }           
        }
        //populate value from cookie data (check conditions if radio/checkbox field is added in form)
        if( fieldAndType[fieldName] == 'input' || fieldAndType[fieldName] == 'select' || fieldAndType[fieldName] == 'textarea' )
            dynamicDom.value = fieldToValues[fieldName];
            
        inputContainer.appendChild(dynamicDom);
        formWarpper.appendChild(inputContainer);
        index++;
    }
    
    var submitButton = document.createElement('button');
    submitButton.type = 'button';
    submitButton.className = 'FT_submitBtn';
    submitButton.innerHTML = FT_translatableStrings['sellFormSubmitText'];
    formWarpper.appendChild(submitButton);

    var trademarkElm = document.createElement( 'div' );
    trademarkElm.className = 'FT_frmfooter';

    var trademarkElmInner = document.createElement( 'div' );
    trademarkElmInner.className = 'FT_regtext';

    var paraTxt = document.createTextNode( FT_translatableStrings[ 'footerPoweredByTxt' ] );

    var trademarkSymbolElm = document.createElement( 'div' );
    trademarkSymbolElm.className = 'FT_regmark';
    trademarkSymbolElm.innerHTML = '&#174;';
    trademarkElmInner.appendChild( paraTxt ); 
    trademarkElmInner.appendChild( trademarkSymbolElm ); 
    trademarkElm.appendChild( trademarkElmInner );

    formWarpper.appendChild( trademarkElm );

    sellFormSection.appendChild(formWarpper);
    //append loader displayed when for is submitted
    var loaderDiv = FT_createLoaderNode();
    sellFormSection.appendChild(loaderDiv);
    FT_bindEvent('click', FT_submitSell, [submitButton]);
    return sellFormSection;
}

var FT_closeModalWithId = function( element ) {
    var modalId = element.getAttribute( 'data-modalid' );
    if( modalId ) {
        document.getElementById( modalId ).style.display = "none"; 
    }
}

var showSellModal = function(){ 
    document.getElementById('FT_sellModal').style.display = 'block';
    clearSellFormData();
    hideLoader('FT_SellSecId'); 
}

var showLoader = function(parentId){
    var parentElement = document.getElementById(parentId);
    var childElement = parentElement.getElementsByClassName('FT_loaderContainer');  
    childElement[0].style.display = 'block';
}

var hideLoader = function(parentId){
    var parentElement = document.getElementById(parentId);
    var childElement = parentElement.getElementsByClassName('FT_loaderContainer');  
    childElement[0].style.display = 'none';
}

var FT_submitSell = function() {
    var JSON_Buffer = FT_validateSellsData();
    console.log(JSON_Buffer);
    
    if(JSON_Buffer) {
        JSON_Buffer['AccountId'] = FT_DealerAccointId;
        JSON_Buffer['TruckId'] = FT_TruckId;
        
        //-- Need to comment once the service is exposed
        document.getElementsByClassName('sellFrom')[0].style.display = 'none';      
        showLoader('FT_SellSecId');
        var isSellFormError = true;
        FT_WebRequestHandler.postRequestCustom(JSON.stringify(JSON_Buffer), apiServiceBaseLink+"trucks?issandbox="+isSandbox, function(xhttp) {
            if ( xhttp && xhttp.readyState == 4 && xhttp.status == 200 ) {
                var serverResponse = JSON.parse(xhttp.responseText);
                //console.log('serverResponse: ',serverResponse);
                var firstParse = JSON.parse(serverResponse.Data);
                if( FT_isJSON(firstParse) ) {
                    var serverData = JSON.parse(firstParse);
                    if( serverData.strMessage == 'Success' ) {
                        //FT_setMessage(true, 'Your Request Has Been Submited Successfully!');
                        FT_setMessage( true, FT_translatableStrings['sellFormSuccessMsg'], 'sellMessageContainerId' );
                        FT_saveSellFormToCookie( JSON.stringify( JSON_Buffer ) );   
                        isSellFormError = false;                        
                    } else {
                        console.log( serverResponse.Message );
                        FT_setMessage( false, FT_getFormErrorMsg(), 'sellMessageContainerId' );                     
                        isSellFormError = true;
                        FT_callSiteDownAlertService( 'Error occurred while submitting sell your fire truck form: '+serverResponse.Message );
                    }
                    
                } else {
                    FT_setMessage( false, firstParse[0].message, 'sellMessageContainerId' );
                    isSellFormError = true;
                    FT_callSiteDownAlertService( 'Error occurred while submitting sell your fire truck form: '+firstParse[0].message );
                }               
            }
            //hide loader
            hideLoader('FT_SellSecId');
            
            if(!isSellFormError) {
                setTimeout(function(){ 
                    document.getElementById('FT_sellModal').style.display = 'none';
                    document.getElementsByClassName('sellFrom')[0].style.display = 'block';
                }, 3000);
                
            }else{
                document.getElementsByClassName('sellFrom')[0].style.display = 'block';
            }
        });
    }
}

function FT_isJSON(str) {
    try {
        return (JSON.parse(str) && !!str);
    } catch (e) {
        return false;
    }
} 
/* A function to validate data and display error messages if any, before submit. */
var FT_validateSellsData = function() {
    var isProcced = true;
    var inquirJSON = {};
    var inquiryTab = document.getElementById('FT_SellSecId');
    var messageContainer = document.getElementById('sellMessageContainerId');
    messageContainer.innerHTML = '';
    var fieldElementList = inquiryTab.getElementsByClassName('FT_input');
    var isFocusSet = false;
    var isEmailValid = false;
    var isPhoneValid = false;
    var isCurrencyValid = false;
    var requiredEmpty = false;
    for(var index = 0; index < fieldElementList.length; index++) {
        var element = fieldElementList[index];
        var elementValue = element.value;
        var errorMessage;
        if(elementValue && elementValue.trim()) {
            if(FT_hasClass(element, 'FT_required')) {               
                if(FT_hasClass(element, 'FT_email')) {
                    isEmailValid = FT_emailRegex.test(elementValue);
                    if(!isEmailValid) {
                        errorMessage = FT_translatableStrings['invalidEmailError'];
                        isProcced = false;
                    } else {
                        element.style.borderColor = 'darkgrey';
                    }                   
                } else if(FT_hasClass(element, 'FT_phone')) {
                    isPhoneValid = FT_phoneRegex.test(elementValue);
                    if(!isPhoneValid) {
                        errorMessage = FT_translatableStrings['invalidPhoneError'];
                        isProcced = false;
                    } else {
                        element.style.borderColor = 'darkgrey';
                    }
                } else {
                    if( !requiredEmpty && isPhoneValid && isEmailValid ) {
                        isProcced = true;
                    }
                    element.style.borderColor = 'darkgrey';
                }       
            }
            if(isProcced) {
                inquirJSON[element.name] = elementValue;
                element.style.borderColor = 'darkgrey';
            } else {
                //element.style.borderColor = 'red';
            }
        } else if(FT_hasClass(element, 'FT_required')) {
            element.style.borderColor = 'red';
            if(isProcced) isProcced = false;
            requiredEmpty = true;
            errorMessage = FT_translatableStrings['requiredErrormsg'];
        }
        if(!isProcced) {
            if( !isFocusSet ) {
                element.focus();
                isFocusSet = true;
            }
            FT_setMessage( isProcced, errorMessage, 'sellMessageContainerId' );         
        }       
    }
    return ((isProcced)? inquirJSON : isProcced);
}
           
/*
* Function to save form data to cookie which can be used for furthet form sumissions
* @formData : form filled data to be saved in cookie
*/
var FT_saveSellFormToCookie = function (formData){   
    var d = new Date();
    d.setTime(d.getTime() + (365 * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = "sellFormData=" + formData + ";" + expires + ";path=/";       
};

var clearSellFormData = function(){     
    var sellFrom = document.getElementsByClassName('sellFrom')[0];  
    var inputs = sellFrom.getElementsByClassName('FT_input');   
    for(var i = 0; i < inputs.length; i++){
        fieldName = inputs[i].getAttribute("Name");     
        if(fieldName == 'Whatyearisyourtruck' || fieldName == 'Whattypeoftruck' ||
           fieldName == 'Whatbrandisyourtruck' || fieldName == 'Whenwouldyouliketosellyourtruck' || fieldName == 'Whatpriceisneededforyourtruck' ||
           fieldName == 'Comments'){        
            inputs[i].value = '';           
            if(inputs[i].tagName === 'SELECT' || inputs[i].tagName === 'select'){
                inputs[i].classList.add('FT_select');
            }
        }
    }
}

var FT_validateCurrency = function (element) {
    if(event.which != 110 && event.which != 190){
        var n = parseFloat(element.value.replace(/\,/g,''),10);        
        if(n)
            element.value = n.toLocaleString();
        else 
            element.value = '';
    }
}

var FT_validateNumberOnly = function(element){
    var number =  element.value;
    if(number)
        element.value = element.value.replace(/[^0-9]+/g,'');
                
}
/*
* Function for copy to clipboard for browser support
*/
window.Clipboard = (function(window, document, navigator) {
    var textArea,
        copy;
    function isOS() {
        return navigator.userAgent.match(/ipad|iphone/i);
    }
    function createTextArea(text) {
        textArea = document.createElement('textArea');
        textArea.value = text;
        document.body.appendChild(textArea);
    }
    function selectText() {
        var range,
            selection;
        if (isOS()) {
            range = document.createRange();
            range.selectNodeContents(textArea);
            selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
            textArea.setSelectionRange(0, 999999);
        } else {
            textArea.select();
        }
    }
    function copyToClipboard() { 
        document.execCommand('copy');
        document.body.removeChild(textArea);
    }
    copy = function(text) {
        createTextArea(text);
        selectText();
        copyToClipboard();
    };
    return {
        copy: copy
    };
})(window, document, navigator);

/* Functions for sitemap  */

var FT_SiteMapContainer;

var FT_loadSiteMap = function() {
    
    FT_SiteMapContainer = document.getElementById('dealerTruckSiteMapContainer');

    if( FT_SiteMapContainer ) {

        FT_DealerAccointId = FT_SiteMapContainer.getAttribute('accountId');
        isSandbox = FT_SiteMapContainer.getAttribute('isSandbox');
        if( isSandbox == null ) { isSandbox = false; }
        FT_BMFA_TruckContainer = document.getElementById('dealerTruckContainerId');
        if( FT_BMFA_TruckContainer ) {
            var style = getComputedStyle(FT_BMFA_TruckContainer);
            FT_ThemeProperties.background = style.backgroundColor;
            FT_SiteMapContainer.innerHTML = FT_LoaderHtml.FT_format([FT_ThemeProperties.background, FT_translatableStrings['loaderText']]);
        }
        FT_SiteMapContainer.innerHTML = FT_LoaderHtml.FT_format([ '#7a0303', FT_translatableStrings['loaderText']]);
        
        //Get data from back-end using web service                
        FT_WebRequestHandler.getRequest( FT_processSiteMap, apiServiceBaseLink+'sitemap?accountId='+FT_DealerAccointId+'&isSandbox='+isSandbox);
    }
}
function FT_replaceQueryStringValues(url, param, value){
    var re = new RegExp("[\\?&]" + param + "=([^&#]*)"), match = re.exec(url), delimiter, newString;
    
    if (match === null) {
        // append new param
        var hasQuestionMark = /\?/.test(url); 
        delimiter = hasQuestionMark ? "&" : "?";
        newString = url + delimiter + param + "=" + value;
    } else {
        delimiter = match[0].charAt(0);
        newString = url.replace(re, delimiter + param + "=" + value);
    }                
    return newString;
}
var FT_processSiteMap = function( xhttp ) {
    
    if ( xhttp && xhttp.readyState == 4 && xhttp.status == 200 ) {
        try {
            var serverResponse = JSON.parse( xhttp.responseText );
            console.log( 'serverResponse: ', serverResponse );
            if( serverResponse.Success ) {

                var firstParse = JSON.parse(serverResponse.Data);
                if( FT_isJSON(firstParse) ) {

                    var siteMapData = JSON.parse(firstParse);
                    console.log( 'siteMapData11: ',siteMapData );               
                    if( siteMapData.isSuccess ) {
                        siteMapData = siteMapData.recordList; //comment this line after back-end change

                        //create HTML and append 
                        var isLoaderRemoved = false;
                        for( var j = 0; j < siteMapData.length; j++ ) {

                            var apparatusData = siteMapData[ j ];

                            if( apparatusData.count > 0 ) {
                                var apparatusParaElm = document.createElement( 'p' );
                                apparatusParaElm.className = 'FT_dealer_sitemap';

                                var apparatusTitleHeadingElm = document.createElement( 'h2' );
                                apparatusTitleHeadingElm.className = 'FT_apparatus_heading';
                                apparatusTitleHeadingElm.innerHTML = apparatusData.apparatusType;

                                apparatusParaElm.appendChild( apparatusTitleHeadingElm );

                                var apparatusTrucksUlElm = document.createElement( 'ul' );
                                apparatusTrucksUlElm.className = 'FT_apparatus_trucks';

                                for( var k = 0; k < apparatusData.trucks.length; k++ ) {

                                    var truckData = apparatusData.trucks[ k ];
                                    var apparatusTrucksLiElm = document.createElement( 'li' );

                                    var apparatusTrucksAnchorElm = document.createElement( 'a' );
                                    apparatusTrucksAnchorElm.innerHTML = truckData.Name;

                                    var truckSrc = window.location.href;
                                    if( truckData.Stock_Number__c ) {
                                        //truckSrc += '?category='+truckData.apparatusType__c+'&stockno='+truckData.Stock_Number__c;
                                        //truckSrc += '?category='+apparatusData.apparatusType+'&stockno='+truckData.Stock_Number__c;
                                        truckSrc = FT_replaceQueryStringValues(truckSrc, 'category', apparatusData.apparatusType);
                                        truckSrc = FT_replaceQueryStringValues(truckSrc, 'stockno', truckData.Stock_Number__c);
                                    }
                                    apparatusTrucksAnchorElm.setAttribute( 'href', truckSrc );

                                    apparatusTrucksLiElm.appendChild( apparatusTrucksAnchorElm );

                                    apparatusTrucksUlElm.appendChild( apparatusTrucksLiElm );
                                }

                                apparatusParaElm.appendChild( apparatusTrucksUlElm );
                                
                                //clear sitemap container and append new elements
                                if( !isLoaderRemoved ) {
                                    while ( FT_SiteMapContainer.hasChildNodes() ) {                                            
                                        FT_SiteMapContainer.removeChild( FT_SiteMapContainer.lastChild );
                                    }
                                    isLoaderRemoved = true;
                                }

                                FT_SiteMapContainer.appendChild( apparatusParaElm );
                                //console.log( 'htmlWithTags11::', FT_SiteMapContainer.innerHTML );
                            }                    
                        }   
                    } else {
                        console.log( 'Error: ', siteMapData.strMessage );
                        FT_callSiteDownAlertService( 'Error occurred while displaying sitemap : '+siteMapData.strMessage );
                    }
                    
                } else {
                    //FT_displayServerError( 'serverErrorMessage' );
                    console.log( 'Error: ', firstParse[0].message );
                    FT_callSiteDownAlertService( 'Error occurred while displaying sitemap : '+firstParse[0].message );
                }       
                
            } else {
                FT_displayServerError( 'serverErrorMessage', 'Error occurred while displaying sitemap : '+serverResponse.Message );
                console.log( 'Server Error Message : ', serverResponse.Message );
            }
        } catch( exp ) {
            //FT_displayServerError( 'serverErrorMessage' );
            console.log( 'Parsing Error Message : ', exp.message );
            FT_callSiteDownAlertService( 'Exception occurred while displaying sitemap : '+exp.message );
        }
    }

}

/* Fire truck finder functions */
var FT_getFormErrorMsg = function() {
    return FT_translatableStrings[ 'formErrorMsgPart1' ]+' <a href="mailto:sales@firetruckfinder.com" target="_top">sales@firetruckfinder.com</a> '+FT_translatableStrings[ 'formErrorMsgPart2' ];
}
var clearTruckFinderFormData = function(){     

    var sellFrom = document.getElementsByClassName('truckFinderFrom')[0];  
    var inputs = sellFrom.getElementsByClassName('FT_input');   

    for(var i = 0; i < inputs.length; i++){

        inputs[i].value = '';  

        //if multiselect picklist remove first selected option ( Label of picklist option )
        if( inputs[i].type == 'select-multiple' ) {

            inputs[i].selectedIndex = -1;
        }
        //make borders gey if errors are heighlighted with red border
        inputs[i].style.borderColor = 'darkgrey';
        
    }
    //clear old error or success message
    FT_clearFormMessage();
    
}
var FT_showTruckFinderModal = function(){ 
    document.getElementById('FT_truckFinderModal').style.display = 'block';
    clearTruckFinderFormData();
    hideLoader('FT_truckFinderSecId'); 
}

var createModal = function( parentNode, modalId, formCreationFunction ) { 

    var modalWrap = document.createElement('div');
    modalWrap.className = 'FT_modal';
    modalWrap.setAttribute( 'id',modalId );
    var modalContainer = document.createElement( 'div' );
    modalContainer.className = 'FT_modalContent';   

    var modalForm = formCreationFunction();
    modalContainer.appendChild( modalForm );

    var closeBtn = document.createElement( 'span' );
    closeBtn.className = 'FT_modalClose cursor';
    closeBtn.setAttribute("data-modalid", modalId );
    closeBtn.appendChild( document.createTextNode( "x" ) );

    FT_bindEvent('click', FT_closeModalWithId, [ closeBtn ] );

    modalWrap.appendChild( closeBtn );
    modalWrap.appendChild( modalContainer );

    parentNode.appendChild( modalWrap );  
}

var FT_addTruckFinderFrom = function() {


    var fieldAndType = {

        'Fire Department' : 'input',
        'First Name' : 'input',
        'Last Name' : 'input',
        "Fire Dept's Website" : 'input',
        'Phone Number' : 'input',
        'Fire Dept State/Province' : 'select',
        'Fire Dept City' : 'input',
        'Email Address' : 'input',

        'Apparatus Type':'select',
        'Mileage' : 'select',
        'Year Min':'select',
        'Year Max' : 'select',
        'Budget Min':'input',
        'Budget Max':'input',
        'Chassis' : 'select',                    
        'Warranty': 'select',
        'Pump Size':'select',
        'Tank Size':'select',
        'Brands' : 'select',
        'Geographic Region':'select'
    }
    
    var fieldToClasses = { 

        'Fire Department' : 'FT_input FT_required',
        'First Name' : 'FT_input FT_required',
        'Last Name' : 'FT_input FT_required',
        "Fire Dept's Website" : 'FT_input',
        'Phone Number' : 'FT_input FT_required FT_phone',
        'Fire Dept State/Province' : 'FT_input FT_required',
        'Fire Dept City' : 'FT_input FT_required',
        'Email Address' : 'FT_input FT_required FT_email',

        'Apparatus Type':'FT_input FT_required',
        'Year Min':'FT_input',
        'Year Max' : 'FT_input',
        'Budget Min':'FT_input',
        'Budget Max':'FT_input',
        'Pump Size':'FT_input no-height',
        'Tank Size':'FT_input',
        'Brands' : 'FT_input FT_required no-height',
        'Chassis' : 'FT_input',
        'Mileage' : 'FT_input',
        'Warranty': 'FT_input',
        'Geographic Region':'FT_input FT_required no-height'                    
    }
    
    var appratusOpt = [ "", "Used Aerials, Ladder Trucks and Quints", "Used Pumpers and Engines", "Used Tankers and Tenders", 
                        "Towers and Platforms", "Rescue Pumpers and Engines", "Used Rescue Trucks and Squads", 
                        "Used Brush Trucks, Quick Attacks & Minis", "Command Units", "Used ARFF and Airport Crash Trucks", 
                        "European Style Units" ];

    var pumpSizeOpt = ['', 'All', '0-500', '500-750', '750-1250', '1250-1500', '1250-1500', '1500-2000', '2000' ];
    var tankSizeOpt = ['', 'All', '0-250', '250-400', '400-750', '750-1100', '1100-1800', '1100-1800', '1800-2500', '2500'];
    var brandsOpt = ["", "E-One", "Pierce", "Other", "KME", "Seagrave", "Ferrara", "Spartan", "Simon-Duplex", "Crimson", "American LaFrance", "Custom Fire", "Rosenbauer", "General", "RD Murray", "Central States", "Toyne", "Marion", "GMC", "Boise Mobile", "Saulsbury", "Darley", "Sutphen", "Helie", "Dependable", "Precision", "Metalfab", "4 Guys", "Anchor Richey", "Blanchat", "HME"];
    var chassisOpt = ['', 'All', 'Custom', '2 Door Commercial', '4 Door Commerical'];
    var mileageOpt = ["", "Under 150,000", "Under 100,000", "Under 15,000", "Under 60,000", "Under 30,000", "Under 45,000", "Under 75,000", "Under 200,000", "Over 200,000"];
    var warrantyOpt = ['', 'All', 'Included', 'Not Included'];
    var geographicRegionsOpt = ["", "USA - South", "USA - West", "Canada", "USA - Northeast", "USA - Midwest", "USA - Southwest", "Pacific Rim", "Middle East"];
    var fireDeptStateOpt = [ "", "AB", "AK", "AL", "AR", "AZ", "BC", "CA", "CO", "CT", "DC", "DE", "FL", "GA", "HI", "IA", "ID", "IL", "IN", "KS", 
                        "KY", "LA", "MA", "MB", "MD", "ME", "MI", "MN", "MO", "MS", "MT", "NB", "NC", "ND", "NE", "NF", "NH", "NJ", "NM", "NS"
                        , "NT", "NU", "NV", "NY", "OH", "OK", "ON", "OR", "PA", "PE", "QC", "RI", "SC", "SD", "SK", "TN", "TX", "UT", "VA", "VT"
                        , "WA", "WI", "WV", "WY", "YT" ];
    var yearsOpt = [ "" ];
    
    var d = new Date();
    var currentYear = d.getFullYear();
    for( i = 1950; i <= currentYear+1; i++ ) {
        yearsOpt.push( i );
    }
    var truckFinderFormSection = document.createElement('div');
    truckFinderFormSection.id = 'FT_truckFinderSecId';
    //truckFinderFormSection.style.display = 'none';
    truckFinderFormSection.className = 'FT_gryTxt FT_container FT_SellSec';
    
    var formTitleDiv = document.createElement('div');
    var titleText = FT_translatableStrings['truckFinderFormTitle'];
    formTitleDiv.innerHTML = titleText;
    formTitleDiv.className = 'FT_formTitle';
    truckFinderFormSection.appendChild(formTitleDiv);

    var formWarpper = document.createElement('div');
    formWarpper.className = 'truckFinderFrom';
    var messageContainerDiv = document.createElement('div');
    messageContainerDiv.id = 'truckFinderMessageContainerId';
    messageContainerDiv.classClass = 'FT_closeBtn';
    formWarpper.appendChild(messageContainerDiv);
    var index = 0;
    
    for(var fieldName in fieldAndType) {
        var inputContainer = document.createElement('div');
        inputContainer.className += ((index%2) ? 'FT_fL' : 'FT_fR');
        var dynamicDom = document.createElement(fieldAndType[fieldName]);
        let fname = fieldName.replace(/\s/g,'');
        fname = fname.replace("'","");
        fname = fname.replace("/","");
        dynamicDom.name = fname;
        dynamicDom.className = fieldToClasses[fieldName];
        if( fieldName === 'Apparatus Type' || fieldName === 'Pump Size' || fieldName === 'Tank Size' || fieldName === 'Brands'
            || fieldName === 'Chassis' || fieldName === 'Mileage' || fieldName === 'Warranty' || fieldName === 'Geographic Region'
            || fieldName === 'Fire Dept State/Province' || fieldName === 'Year Min' || fieldName === 'Year Max' ) {
            dynamicDom.className += ' FT_gryTxt FT_select';
            var optionsVar = '';
            if( fieldName === 'Apparatus Type' ) {
                optionsVar = appratusOpt;
            } else if( fieldName === 'Pump Size' ) {
                optionsVar = pumpSizeOpt;
                dynamicDom.setAttribute( 'multiple', true );
            } else if( fieldName === 'Tank Size' ) {
                optionsVar = tankSizeOpt;
            } else if( fieldName === 'Brands' ) {
                optionsVar = brandsOpt;
                dynamicDom.setAttribute( 'multiple', true );
            } else if( fieldName === 'Chassis' ) {
                optionsVar = chassisOpt;
            } else if( fieldName === 'Mileage' ) {
                optionsVar = mileageOpt;
            } else if( fieldName === 'Warranty' ) {
                optionsVar = warrantyOpt;
            } else if( fieldName === 'Geographic Region' ) {
                optionsVar = geographicRegionsOpt;
                dynamicDom.setAttribute( 'multiple', true );
            } else if( fieldName === 'Fire Dept State/Province' ) {
                optionsVar = fireDeptStateOpt;
            } else if( fieldName === 'Year Min' || fieldName === 'Year Max' ) {
                optionsVar = yearsOpt;
            } 
            optionsVar.forEach(function(opt) {
                var option = document.createElement('option');
                option.value = (opt) ? opt: '';
                var optLabel = '';
                if( opt ) {
                    optLabel = opt;
                    if( fieldName === 'Pump Size' && opt != 'All' ) {
                        optLabel += ( opt == '2000' ) ? '+ GPM' : ' GPM';                                    
                    } else if( fieldName === 'Tank Size' && opt != 'All' ) {
                        optLabel += ( opt == '2500' ) ? '+ Gallons' : ' Gallons';  
                    }
                } else {
                    optLabel = ( ( typeof FT_translatableStrings[fieldName] != 'undefined' ) ? FT_translatableStrings[fieldName] : fieldName );
                    if( fieldToClasses[ fieldName ] && fieldToClasses[ fieldName ].includes('FT_required') ) {
                        optLabel += ' *';
                    }
                }
                option.innerHTML = optLabel;
                if(!opt) {
                    option.disabled = true;
                    if( !dynamicDom.getAttribute('multiple') ) {
                        option.selected = true;    
                    } else {
                        option.classList.add( 'grey-opt' );             
                    }
                }
                dynamicDom.appendChild(option);
            });
            
            //FT_bindEvent('change', removeFT_SelectClass, [dynamicDom]);
            
        } else { //input fields

            if( fieldName == 'Budget Min' || fieldName == 'Budget Max' ) {
                dynamicDom.placeholder = ( typeof FT_translatableStrings[fieldName] != 'undefined' ) ? FT_translatableStrings[fieldName] : fieldName;                           
                FT_bindEvent('keyup', FT_validateNumberOnly, [dynamicDom]);
                
            } else{
                dynamicDom.placeholder = ( typeof FT_translatableStrings[fieldName] != 'undefined' ) ? FT_translatableStrings[fieldName] : fieldName;   
            } 

            if( fieldName == 'Phone Number' ) {
                FT_bindEvent('keyup', FT_processNumberEntry, [dynamicDom]);
            }

            if( fieldToClasses[ fieldName ] && fieldToClasses[ fieldName ].includes("FT_required") ) {
                dynamicDom.placeholder += ' *';
            }
        }
                            
        inputContainer.appendChild(dynamicDom);
        formWarpper.appendChild(inputContainer);
        index++;
    }
    
    var submitButton = document.createElement('button');
    submitButton.type = 'button';
    submitButton.className = 'FT_submitBtn';
    //submitButton.innerHTML = FT_translatableStrings['sellFormSubmitText'];
    submitButton.innerHTML = FT_translatableStrings['truckFinderSubmitText'];
    formWarpper.appendChild(submitButton);

    var trademarkElm = document.createElement( 'div' );
    trademarkElm.className = 'FT_frmfooter';

    var trademarkElmInner = document.createElement( 'div' );
    trademarkElmInner.className = 'FT_regtext';

    var paraTxt = document.createTextNode( FT_translatableStrings[ 'footerPoweredByTxt' ] );

    var trademarkSymbolElm = document.createElement( 'div' );
    trademarkSymbolElm.className = 'FT_regmark';
    trademarkSymbolElm.innerHTML = '&#174;';
    trademarkElmInner.appendChild( paraTxt ); 
    trademarkElmInner.appendChild( trademarkSymbolElm ); 
    trademarkElm.appendChild( trademarkElmInner );

    formWarpper.appendChild( trademarkElm );

    truckFinderFormSection.appendChild(formWarpper);
    //append loader displayed when for is submitted
    var loaderDiv = FT_createLoaderNode();
    truckFinderFormSection.appendChild(loaderDiv);
    FT_bindEvent('click', FT_submitTruckFinderForm, [submitButton]);
    return truckFinderFormSection;
}

function FT_getSelectedValues( select ) {
    var result = [];
    var options = select && select.options;
    var opt;

    for (var i=0, iLen=options.length; i<iLen; i++) {
        opt = options[i];

        if (opt.selected) {
            result.push(opt.value || opt.text);
        }
    }
    //return result.join();
    return result;
}

/* A function to validate truck finder data and display error messages if any, before submit. */
var FT_validateTruckFinderData = function() {
    var isProcced = true;
    var truckFinderInputJson = {};
    var truckFinderSection = document.getElementById('FT_truckFinderSecId');
    var messageContainer = document.getElementById('truckFinderMessageContainerId');
    messageContainer.innerHTML = '';
    var fieldElementList = truckFinderSection.getElementsByClassName('FT_input');
       var isFocusSet = false;
    var isEmailValid = false;
    var isPhoneValid = false;
    var requiredEmpty = false;
    for(var index = 0; index < fieldElementList.length; index++) {
        var element = fieldElementList[index];
        var elementValue = element.value;
        var errorMessage;
        if(elementValue && elementValue.trim()) {
            if(FT_hasClass(element, 'FT_required')) {               
                if(FT_hasClass(element, 'FT_email')) {
                    isEmailValid = FT_emailRegex.test(elementValue);
                    if(!isEmailValid) {
                        errorMessage = FT_translatableStrings['invalidEmailError'];
                        isProcced = false;
                    } else {
                        element.style.borderColor = 'darkgrey';
                    }                   
                } else if(FT_hasClass(element, 'FT_phone')) {
                    isPhoneValid = FT_phoneRegex.test(elementValue);
                    if(!isPhoneValid) {
                        errorMessage = FT_translatableStrings['invalidPhoneError'];
                        isProcced = false;
                    } else {
                        element.style.borderColor = 'darkgrey';
                    }
                } else {
                    if( !requiredEmpty && isPhoneValid && isEmailValid ) {
                        isProcced = true;
                    }
                    element.style.borderColor = 'darkgrey';
                }       
            }
            if(isProcced) {
                
                if( element.type == 'select-multiple' ) {
                    elementValue = FT_getSelectedValues( element );
                }
                truckFinderInputJson[element.name] = elementValue;
                element.style.borderColor = 'darkgrey';
            } else {
                //element.style.borderColor = 'red';
            }
        } else if(FT_hasClass(element, 'FT_required')) {
            element.style.borderColor = 'red';
            if(isProcced) isProcced = false;
            requiredEmpty = true;
            errorMessage = FT_translatableStrings['requiredErrormsg'];
        }
        if(!isProcced) {
            if( !isFocusSet ) {
                element.focus();
                isFocusSet = true;
            }
            FT_setMessage( isProcced, errorMessage, 'truckFinderMessageContainerId' );         
        }       
    }
    return ((isProcced)? truckFinderInputJson : isProcced);
}

var FT_submitTruckFinderForm = function() {

    var JSON_Buffer = FT_validateTruckFinderData();
    console.log( 'TruckFinder submitted data: ', JSON_Buffer );
    
    if(JSON_Buffer) {
        JSON_Buffer['AccountId'] = FT_DealerAccointId;
        
        //-- Need to comment once the service is exposed
        document.getElementsByClassName('truckFinderFrom')[0].style.display = 'none';      
        showLoader('FT_truckFinderSecId');
        var isTruckFinderFormError = true;
        FT_WebRequestHandler.postRequestCustom(JSON.stringify(JSON_Buffer), apiServiceBaseLink+"FireTruckFinder?issandbox="+isSandbox, function(xhttp) {
            if ( xhttp && xhttp.readyState == 4 && xhttp.status == 200 ) {
                var serverResponse = JSON.parse(xhttp.responseText);
                console.log('serverResponse: ',serverResponse);
                var firstParse = JSON.parse(serverResponse.Data);
                if( FT_isJSON(firstParse) ) {
                    var serverData = JSON.parse(firstParse);
                    console.log('serverData: ',serverData);
                    if( serverData.isSuccess ) {
                        FT_setMessage( true, FT_translatableStrings['truckFinderFormSuccessMsg'], 'truckFinderMessageContainerId' );
                        isTruckFinderFormError = false;                        
                    } else {
                        console.log( serverData.strMessage );
                        FT_setMessage( false, FT_getFormErrorMsg(), 'truckFinderMessageContainerId' );                     
                        isTruckFinderFormError = true;
                        FT_callSiteDownAlertService( 'Error occurred while submitting truck finder form : '+serverData.strMessage );
                    }
                    
                } else {
                    FT_setMessage( false, firstParse[0].message, 'truckFinderMessageContainerId' );
                    isTruckFinderFormError = true;
                    FT_callSiteDownAlertService( 'Error occurred while submitting truck finder form : '+firstParse[0].message );
                }            
            }
            //hide loader
            hideLoader('FT_truckFinderSecId');
            
            if(!isTruckFinderFormError) {
                setTimeout(function(){ 
                    document.getElementById('FT_truckFinderModal').style.display = 'none';
                    document.getElementsByClassName('truckFinderFrom')[0].style.display = 'block';
                }, 3000);
                
            }else{
                document.getElementsByClassName('truckFinderFrom')[0].style.display = 'block';
            }
        });
    }
}

var FT_callSiteDownAlertServiceCallback = function( xhttp,additionalParams ) {

    if ( xhttp && xhttp.readyState == 4 && xhttp.status == 200 ) {

        var serverResponse = JSON.parse( xhttp.responseText );
        console.log('FT_callSiteDownAlertService serverResponse: ',serverResponse);
        
        if( FT_isJSON( serverResponse ) ) {
            var serverData = JSON.parse( serverResponse );
            console.log('FT_callSiteDownAlertService serverData : ', serverData);
            if ( !serverData.isSuccess ) {
            	console.log( 'Error occurred while sending mail of site down alert: ', serverData.strMessage );
            }            
        } else {
            console.log( 'Error: reponse is not a valid JSON' );
        }
    }
}


var FT_callSiteDownAlertService = function( reason ) {
	let sourceURL = window.location.href;
	var serviceParams = { 
		accountId: FT_BMFA_TruckContainer.getAttribute('accountId'), 
		reson: reason, 
		source: sourceURL 
	};
	var serviceBaseUrl = sandboxServiceUrl;
	if( !isSandbox ) {
		serviceBaseUrl = productionServiceUrl;
	} 
    var customURL = serviceBaseUrl + "SiteDownAlert"; 
            
    FT_WebRequestHandler.postRequestCustom( JSON.stringify( serviceParams ), customURL, FT_callSiteDownAlertServiceCallback );
}
