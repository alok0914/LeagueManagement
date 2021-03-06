import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingController, ToastController } from 'ionic-angular';


import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';

import { HomePage } from '../home/home';
import { MyLeaguePage } from '../myleague/myleague';
import { AboutPage } from '../about/about';
import { LatestnewsPage } from '../latestnews/latestnews';
import { HelpPage } from '../help/help';
import { DonatePage } from '../donate/donate';
import { CareerPage } from '../career/career';
import { ContactPage } from '../contact/contact';
import { TermsPage } from '../terms/terms';
import { PrivacypolicyPage } from '../privacypolicy/privacypolicy'; 

@Component({
    selector: 'edit-profile',
    templateUrl: 'editprofile.html',
})
export class EditPage {
    profileForm: FormGroup;
    successMessage: string;
    errorMessage: string;
    profile_pic: any;
    result: any;
    contactInfoForm: FormGroup;
    personalInfoForm: FormGroup;
    tennisInfoForm: FormGroup;
    userIsLogged: boolean;
    userEmail: string;
    pages: Array<{ title: string, component: any }>;


    constructor(private fb: FormBuilder, public navCtrl: NavController, public navParams: NavParams, public service: RemoteServiceProvider) {
        this.userIsLogged = false;
        if (sessionStorage.getItem("loginDone") == 'userIsLogged') {
            this.userIsLogged = true;
            this.userEmail = JSON.parse(sessionStorage.getItem("loggedUserName"));
        }
        this.successMessage = '';
        this.errorMessage = '';

        this.pages = [
            { title: 'My League', component: MyLeaguePage },
            { title: 'About' , component: AboutPage },
            { title: 'News' , component: LatestnewsPage},
            { title: 'Help' , component: HelpPage},
            { title: 'Donate' , component: DonatePage},
            { title: 'Career' , component: CareerPage},
            { title: 'Contact' , component: ContactPage},
            { title: 'Terms' , component: TermsPage},
            { title: 'Policy' , component: PrivacypolicyPage}
          ];
        // this.profileForm = fb.group({
        //     'email': [null, Validators.compose([Validators.required, Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')])],
        //     'full_name': [null, Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z \-\']+')])],
        //     'username': [null],
        //     'office_phone': [null],
        //     'home_phone': [null,Validators.pattern('^[0-9]*$')],
        //     'cell_phone': [null,Validators.pattern('^[0-9]*$')],
        //     'address1': [null],
        //     'address2': [null],
        //     'city': [null],
        //     'user_state': [null],
        //     'country': [null],
        //     'zip': [null,Validators.pattern('^[0-9]*$')],
        //     'height': [null],
        //     'dob': [null],
        //     'gender': [null],
        //     'preferred_location': [null],
        //     'handedness': [null],
        //     'rating_type': [null],
        //     'rating': [null],
        //     'user_others': [null],
        //     'strength': [null],
        //     'weakness': [null],

        // });

        this.contactInfoForm = fb.group({
            'email': [null, Validators.compose([Validators.required, Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')])],
            'full_name': [null, Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z \-\']+')])],
            'office_phone': [null],
            'home_phone': [null, Validators.pattern('^[0-9]*$')],
            'cell_phone': [null, Validators.pattern('^[0-9]*$')],
            'address1': [null],
            'address2': [null],
            'city': [null],
            'user_state': [null],
            'country': [null],
            'zip': [null, Validators.pattern('^[0-9]*$')],
        });

        this.personalInfoForm = fb.group({
            'username': [null],
            'height': [null,Validators.pattern('[0-9.-]*')],
            'dob': [null],
            'gender': [null],
        });

        this.tennisInfoForm = fb.group({
            'preferred_location': [null],
            'handedness': [null],
            'rating_type': [null],
            'rating': [null,Validators.pattern('[0-9.-]*')],  
            'user_others': [null],
            'strength': [null],
            'weakness': [null],
        })

        this.profile_pic = sessionStorage.getItem("profile_pic");
        this.getUserData();
        
    }

    // //function to update user profile
    // saveProfile(value) {
    //     console.log(value);
    //     let id = JSON.parse(sessionStorage.getItem("loggedUserId"));
    //     this.service.saveProfile(id, value).subscribe((res: any[]) => {
    //         this.successMessage = JSON.stringify(res['res']);
    //         this.successMessage = JSON.parse(this.successMessage);
    //     },
    //         error => {
    //             this.errorMessage = JSON.stringify(error['error']['res']);
    //             this.errorMessage = JSON.parse(this.errorMessage);
    //         });
    // }

    //function to update user profile
    saveProfile(value1, value2, value3) {
        let value = { ...value1, ...value2, ...value3 };
        let id = JSON.parse(sessionStorage.getItem("loggedUserId"));
        for(let profileValue in value){
            if (value[profileValue] == ""){
                value[profileValue] = null;
            }
        }
        this.service.saveProfile(id, value).subscribe((res: any[]) => {
            this.successMessage = JSON.stringify(res['res']);
            this.successMessage = JSON.parse(this.successMessage);
        },
            error => {
                this.errorMessage = JSON.stringify(error['error']['res']);
                this.errorMessage = JSON.parse(this.errorMessage);
            });
    }

    //function to cancel editing user profile and go back to home page
    cancel() {
        this.navCtrl.push(HomePage);
    }

    // function to get data from API for edit profile form
    // getUserData() {
    //     let id = JSON.parse(sessionStorage.getItem("loggedUserId"));
    //     this.service.getUser(id).subscribe((res: any[]) => {
    //         this.profileForm.setValue({
    //             'email': res['res']['email'],
    //             'full_name': res['res']['full_name'],
    //             'username': res['res']['username'],
    //             'office_phone': res['res']['office_phone'],
    //             'home_phone': res['res']['home_phone'],
    //             'cell_phone': res['res']['cell_phone'],
    //             'address1': res['res']['address1'],
    //             'address2': res['res']['address2'],
    //             'city': res['res']['city'],
    //             'user_state': res['res']['user_state'],
    //             'country': res['res']['country'],
    //             'zip': res['res']['zip'],
    //             'height': res['res']['height'],
    //             'dob': res['res']['dob'],
    //             'gender': res['res']['gender'],
    //             'preferred_location': res['res']['preferred_location'],
    //             'handedness': res['res']['handedness'],
    //             'rating_type': res['res']['rating_type'],
    //             'rating': res['res']['rating'],
    //             'user_others': res['res']['user_others'],
    //             'strength': res['res']['strength'],
    //             'weakness': res['res']['weakness'],

    //         });
    //     },
    //         error => {
    //             this.errorMessage = JSON.stringify(error['error']['res']);
    //             this.errorMessage = JSON.parse(this.errorMessage);
    //         });
    // }

    //function to get data from API for edit profile form
    getUserData() {
        let id = JSON.parse(sessionStorage.getItem("loggedUserId"));
        this.service.getUser(id).subscribe((res: any[]) => {

            this.contactInfoForm.setValue({
                'email': res['res']['email'],
                'full_name': res['res']['full_name'],
                'office_phone': res['res']['office_phone'],
                'home_phone': res['res']['home_phone'],
                'cell_phone': res['res']['cell_phone'],
                'address1': res['res']['address1'],
                'address2': res['res']['address2'],
                'city': res['res']['city'],
                'user_state': res['res']['user_state'],
                'country': res['res']['country'],
                'zip': res['res']['zip'],
            });
            this.personalInfoForm.setValue({
                'username': res['res']['username'],
                'height': res['res']['height'],
                'dob': res['res']['dob'],
                'gender': res['res']['gender'],
            });
            this.tennisInfoForm.setValue({
                'preferred_location': res['res']['preferred_location'],
                'handedness': res['res']['handedness'],
                'rating_type': res['res']['rating_type'],
                'rating': res['res']['rating'],
                'user_others': res['res']['user_others'],
                'strength': res['res']['strength'],
                'weakness': res['res']['weakness'],
            });
        },
            error => {
                this.errorMessage = JSON.stringify(error['error']['res']);
                this.errorMessage = JSON.parse(this.errorMessage);
            });
    }

    //function to redirect to home page
    openHomePage() {
        this.navCtrl.push(HomePage);
    }

    openPages(destinationPage) {
          for(let i=0;i<this.pages.length;i++){
            if(this.pages[i].title == destinationPage){
              this.navCtrl.push(this.pages[i].component);
            }
          }
        }

    //function to logout of the application
    logout() {
        sessionStorage.setItem("loginDone", null);
        sessionStorage.setItem("loggedUserId", null);
        sessionStorage.setItem("loggedUserName", null);
        sessionStorage.setItem("loggedUserEmail", null);
        this.navCtrl.push(HomePage);
    }


    // getImage() {
    //     const options: CameraOptions = {

    //       quality: 100,
    //       destinationType: this.camera.DestinationType.FILE_URI,
    //       sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    //     }

    //     this.camera.getPicture(options).then((imageData) => {
    //       this.imageURI = imageData;
    //     }, (err) => {
    //       console.log(err);
    //       this.presentToast(err);
    //     });
    //   }


    //   uploadFile() {

    //     let loader = this.loadingCtrl.create({
    //       content: "Uploading..."
    //     });
    //     loader.present();
    //     const fileTransfer: FileTransferObject = this.transfer.create();

    //     let options: FileUploadOptions = {
    //       fileKey: 'ionicfile',
    //       fileName: 'ionicfile',
    //       chunkedMode: false,
    //       mimeType: "image/jpeg",
    //       headers: {}
    //     }

    //     // this.fileOpener.open('path/to/file.pdf', 'application/pdf')
    //     // .then(() => console.log('File is opened'))
    //     // .catch(e => console.log('Error openening file', e));

    //     fileTransfer.upload(this.imageURI, 'http://192.168.0.7:8080/api/uploadImage', options)
    //       .then((data) => {
    //       console.log(data+" Uploaded Successfully");
    //       this.imageFileName = "http://192.168.0.7:8080/static/images/ionicfile.jpg"
    //       loader.dismiss();
    //       this.presentToast("Image uploaded successfully");
    //     }, (err) => {
    //       console.log(err);
    //       loader.dismiss();
    //       this.presentToast(err);
    //     });
    //   }

    //   presentToast(msg) {
    //     let toast = this.toastCtrl.create({
    //       message: msg,
    //       duration: 3000,
    //       position: 'bottom'
    //     });

    //     toast.onDidDismiss(() => {
    //       console.log('Dismissed toast');
    //     });

    //     toast.present();
    //   }

    // //   callMyAction() {
    // //     // options = {sourceType: 0}
    // //    Camera.getPicture(options).then((imageData) => {
    // //      // imageData is either a base64 encoded string or a file URI
    // //      // If it's base64:
    // //      let base64Image = 'data:image/jpeg;base64,' + imageData;
    // //    }, (err) => {
    // //      // Handle error
    // //    });
    // //  }

    // // ionViewDidLoad() {
    // //     this.file.listDir(this.file.externalRootDirectory,'Downloads')
    // //     .then((data) =>{
    // //         this.downloads = data;

    // //     });
    // // }

    // getImage() {
    //     this.cameraService.getPicture().then((res: any[]) => {
    //         console.log(res);
    //     })
    // }

    // onSelectFile(event) { // called each time file input changes
    //     if (event.target.files && event.target.files[0]) {
    //       var reader = new FileReader();

    //       reader.readAsDataURL(event.target.files[0]); // read file as data url

    //       reader.onload = (event) => { // called once readAsDataURL is completed
    //         sessionStorage.setItem("profile_pic",event.target.result);
    //         this.profile_pic = sessionStorage.getItem("profile_pic");
    //       }
    //     }
    // }



}
