import { Injectable, inject } from '@angular/core';
import { Project } from '../shared/firestore-models/project.model';
import {
  AngularFireStorage
} from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class AdminPanelService {

  constructor(private storage: AngularFireStorage) { }

  //Creates new project document
  async createNewProject(project: Project) {

    let { fileMap, html } = this.changeBase64ImagesToFilePaths(project.content!)
    console.log(fileMap)
    console.log(html)

    await this.saveAllContentImages(fileMap, "project/x")

    console.log("saved", )

  }

  private async saveAllContentImages(fileMap: Map<string, Blob>, path: string) {
    for (const [fileName, blob] of fileMap.entries()) {
      try {
        await this.saveImageToFireStorage(path, fileName, blob);
      } catch (error) {
        console.error("Error saving image", fileName, error);
      }
    }
  }

  private async saveImageToFireStorage(path: string, fileName: string, blob: Blob) {

    const storageRef = this.storage.ref(path + "/" + fileName);
    const uploadTask = await storageRef.put(blob);
    const downloadUrl = storageRef.getDownloadURL().subscribe(url=>{
      console.log(url)
    })

    console.log(downloadUrl)
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
