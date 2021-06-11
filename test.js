const ResumeParser = require('./src')

const dictionary = {
   titles: {
    objective: ['objective', 'objectives'],
    summary: ['summary'],
    technology: ['technology', 'technologies'],
    experience: ['experience'],
    education: ['education'],
    skills: ['skills', 'Skills & Expertise', 'technology', 'technologies'],
    languages: ['languages'],
    courses: ['courses'],
    projects: ['projects'],
    links: ['links'],
    contacts: ['contacts'],
    positions: ['positions', 'position'],
    profiles: [
      'profiles',
      'social connect',
      'social-profiles',
      'social profiles',
    ],
    awards: ['awards'],
    honors: ['honors'],
    additional: ['additional'],
    certification: ['certification', 'certifications'],
    interests: ['interests'],
  }
}

 const fileDir = process.cwd() + '/files/';
 ResumeParser
   .parseResumeFile(fileDir + 'resume.pdf', dictionary)
   .then(file => {
     console.log('OUI', file);
   })
   .catch(error => {
     console.log('parseResume failed');
     console.error(error);
   });

