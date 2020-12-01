### usage steps

#### 1.get domain 、urls ready， add them in database

#### 2.generate products json， add them in database
图片前缀example （项目根目录public下）
imgs/pallet-wholesale.com/img

#### 3.generate images based on json in step 2
move generated folder(example.com) to /public/imgs/


#### 4.change configs in website

changes in /utils.js
1. DOMAIN
2. siteUrl
3. menu ( url与text 和/public/imgs/example.com/ 里面的文件夹名称保持一致)


changes in /pages/产品分类目录，把分类目录改为 /public/imgs/example.com/ 里面的文件夹名称