import { Injectable, inject } from '@angular/core';
import { Project } from '../shared/firestore-models/project.model';
import {
  AngularFireStorage
} from '@angular/fire/compat/storage';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AdminPanelService {

  projectsCollection: AngularFirestoreCollection<Project> = this.firestore.collection<Project>("Project");

  constructor(private storage: AngularFireStorage, private firestore: AngularFirestore) { }

  // Creates new project document
  async createNewProject(project: Project) {
    let { fileMap, html } = this.changeBase64ImagesToFilePaths(project.content!);
    const projectId = this.firestore.createId();

    console.log(fileMap);
    console.log(html);

    const imageLinksMap = await this.saveAllContentImages(fileMap, `project/${projectId}`);

    // Replace image names in HTML with their corresponding URLs
    for (const [fileName, url] of imageLinksMap.entries()) {
      html = html.replace(fileName, url);
    }

    // Save the project to Firestore
    project.content = html
    try {
      await this.projectsCollection.doc(projectId).ref.set(project);
      console.log("Project saved successfully with ID:", projectId);
    } catch (error) {
      console.error("Error saving project:", error);
    }
  }

  private async saveAllContentImages(fileMap: Map<string, Blob>, path: string): Promise<Map<string, string>> {
    const imageLinksMap = new Map<string, string>();

    for (const [fileName, blob] of fileMap.entries()) {
      try {
        const url = await this.saveImageToFireStorage(path, fileName, blob);
        imageLinksMap.set(fileName, url);
      } catch (error) {
        console.error("Error saving image", fileName, error);
      }
    }

    return imageLinksMap;
  }

  private async saveImageToFireStorage(path: string, fileName: string, blob: Blob): Promise<string> {
    const storageRef = this.storage.ref(`${path}/${fileName}`);
    const uploadTask = await storageRef.put(blob);
    const downloadUrl = await storageRef.getDownloadURL().toPromise(); // Change to toPromise() to get the URL directly

    console.log("Uploaded image URL: ", downloadUrl);
    return downloadUrl;
  }

  private changeBase64ImagesToFilePaths(html: string): { fileMap: Map<string, Blob>, html: string } {
    const fileMap: Map<string, Blob> = new Map();
    const imgTags: string[] = html.match(/<img[^>]+>/g) || [];

    imgTags.forEach(imgTag => {
      const srcMatch = imgTag.match(/src="(.+?)"/);

      if (srcMatch) {
        const src: string = srcMatch[1];

        if (src.startsWith('data:image/')) {
          const { imgName, blob } = this.convertBase64ToBlob(src);
          fileMap.set(imgName, blob);

          const newImgTag = imgTag.replace(/src="(.+?)"/, `src="${imgName}"`);

          html = html.replace(imgTag, newImgTag);
        }
      }
    });

    return { fileMap, html };
  }

  //
  private convertBase64ToBlob(base64_image: string): { imgName: string, blob: Blob } {
    const mimeType: string = base64_image.split(';')[0].split(':')[1];
    const base64Data: string = base64_image.split(',')[1];

    const byteCharacters: string[] = atob(base64Data).split('');
    const byteNumbers: number[] = byteCharacters.map(char => char.charCodeAt(0));
    const byteArray: Uint8Array = new Uint8Array(byteNumbers);

    const blob: Blob = new Blob([byteArray], { type: mimeType });
    const imgName: string = `image-${Date.now()}.${mimeType.split('/')[1]}`;

    return { imgName, blob };
  }
}
