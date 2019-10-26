/*global fetch*/
// 

console.log("hello");
//console.log( moment().format('MMMM Do YYYY, h:mm:ss a'));

let app = new Vue({
    el: "#app",
    data:{
        key: '2161b383a811f994f0a98f1d5e0d67fe32b7b15d',
        country: '&country=US',
        year: '&year=2019',
        month: '&month=12',
        day: '&day=24',
        curr_year: '',
        curr_month: '',
        curr_day: '',
        url:'https://calendarific.com/api/v2/holidays?&api_key=',
        holidays: [
            {
                name: '',
                description: '',
            }
        ],
        holiday_sequence: [
            {
                name: '',
                description: '',
                date: ''
            }
        ],
    },
    created(){
        this.ushd();
    },
    methods:{
        async ushd(){
            try {
                this.curr_year = parseInt(moment().format('YYYY'));
                this.curr_month = parseInt(moment().format('M'));
                this.curr_day = parseInt(moment().format('D'));
                console.log(this.curr_year);
                console.log(this.curr_month);
                console.log(this.curr_day);
                console.log(moment().add(-1,'days').format('D-M-YYYY'))
                const the_url = this.url+this.key+this.country+this.year+this.month+this.day;
                const response = await axios.get(the_url);
                this.holidays = response.data.response.holidays;
                this.addHolidaySequence(0,this.holidays[0].name,this.holidays[0].description,0);
                //console.log(this.holidays.size);
                //console.log(this.holidays[0]);
                console.log(this.holidays[0].name);
                console.log(this.holidays[0].description);
                //this.most_important_hld = this.holidays[0];
            } catch (error) {
                console.log(error);
            }
        },
        addHolidaySequence(num, name, description, days) {
            
            this.holiday_sequence[num].date = moment().add(days,'days').format('MMMM Do YYYY');
            this.holiday_sequence[num].name = name;
            this.holiday_sequence[num].description = description;
        },
    },
});


//......

/*let epp= new Vue({
    el: "#app",
    data:{
        url:'https://random.dog/8b48bc81-16fd-4d1d-b593-1d671107ca5a.jpg',
        fav:'https://random.dog/8b48bc81-16fd-4d1d-b593-1d671107ca5a.jpg',
        size:0,
        loading:false,
    },
    methods:{
        async jokes(){
            try{
                this.loading=true;
                const response = await axios.get("https://random.dog/woof.json")
                this.url=response.data.url;
                if(this.url.includes('.mp4')|| this.url.includes('.webm')){
                    this.jokes()
                }
                console.log(this.url);
                this.loading=false;
            }
            catch(error){
                console.log(error);
            }
        },
        favorite(){
            this.fav = this.url;
        }
    }
});*/