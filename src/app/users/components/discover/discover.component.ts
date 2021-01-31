import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/models/post.model';
import { Talent } from 'src/app/models/talent.model';
import { User } from 'src/app/models/user.model';
import { PostsService } from 'src/app/services/posts.service';
import { TalentService } from 'src/app/services/talent.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.scss']
})
export class DiscoverComponent implements OnInit {
  public user: User = new User();
  talentList: Talent[] = [];
  postList: Post[] = [];

  constructor(private talentService: TalentService, private route: Router, private postsService: PostsService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('userdata')!)
    if (this.user) {
      // console.log(this.usrInfo.loggedin)

      this.getAllTalents();
    }
    else
      this.route.navigate(['/landing'])
  }

  getAllTalents() {

    this.talentService.getAllTalents().subscribe(res => {
      this.talentList = res

      console.log(this.talentList)
    });

  }

  getPostsByTalent(id: string) {

    this.postsService.getPostsOfTalent(id).subscribe(res => {
      this.postList = res
      console.log(this.postList)
    });
    

  }

}
