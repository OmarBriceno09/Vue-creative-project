/*global fetch*/
// 

console.log("hello");
//console.log( moment().format('MMMM Do YYYY, h:mm:ss a'));

let app = new Vue({
    el: "#app",
    data:{
        key: '2161b383a811f994f0a98f1d5e0d67fe32b7b15d',
        country: '&country=US',
        year: '',
        month: '',
        day: '',
        curr_year: 0,
        curr_month: 0,
        curr_day: 0,
        url:'https://calendarific.com/api/v2/holidays?&api_key=',
        full_url:'',
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
                date: '',
            }
        ],
    },
    created(){
        this.ushd();
    },
    methods:{
        async ushd(){
            try {
                this.changeDay(0);
                const response1 = await axios.get(this.full_url);
                this.holidays = response1.data.response.holidays;
                this.addHolidaySequence(0,0);
                
                this.changeDay(1);
                const response2 = await axios.get(this.full_url);
                this.holidays = response2.data.response.holidays;
                this.addHolidaySequence(1,1);
                
                this.changeDay(2);
                const response3 = await axios.get(this.full_url);
                this.holidays = response3.data.response.holidays;
                this.addHolidaySequence(2,2);
                
                console.log(this.holiday_sequence);
            } catch (error) {
                console.log(error);
            }
        },
        changeDay(days){
            this.curr_year = parseInt(moment().add(days,'days').format('YYYY'));
            this.curr_month = parseInt(moment().add(days,'days').format('M'));
            this.curr_day = parseInt(moment().add(days,'days').format('D'));
            this.year = '&year='+this.curr_year.toString();
            this.month = '&month='+this.curr_month.toString();
            this.day = '&day='+this.curr_day.toString();
            //this.day = '&day=25';
            this.full_url= this.url+this.key+this.country+this.year+this.month+this.day;
        },
        addHolidaySequence(num, days) {
            var the_name = 'Huh, nothing happens this day...';
            var the_description = 'hmm.....';
            //console.log(this.holidays.length);
            if (this.holidays.length){
                the_name = this.holidays[0].name;
                the_description = this.holidays[0].description;
            }
            Vue.set(this.holiday_sequence, num, {
                name: the_name,
                description: the_description,
                date: moment().add(days,'days').format('MMMM Do YYYY'),
            });
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