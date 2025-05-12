import React from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import TextLink from '@/components/TextLink';
import { useTr } from '@/i18n/tr';
interface Experience {
  year: string;
  role?: string;
  experience: string | React.ReactNode;
  edin: string | React.ReactNode;
}

const About: React.FC = () => {
  const { tr } = useTr();
  const experiences: Experience[] = [
    {
      year: tr('Apr 2013'),
      role: tr('Faculty of Liberal Arts/Applied Physics'),
      experience: tr('Enter University'),
      edin: tr('the University of Tokyo'),
    },
    {
      year: tr('Apr 2017'),
      role: tr('Graduate School of Frontier Sciences'),
      experience: (
        <ul>
          <li>{tr('Enter Graduate School')}</li>
          <li>{tr('Research on Surface Physics', 'About Me')}</li>
          <li>
            <TextLink href="https://iopscience.iop.org/article/10.7567/1347-4065/aaf4b5/meta">
              {tr('One Paper as the First Author', 'About Me')}
            </TextLink>
          </li>
        </ul>
      ),
      edin: tr('the University of Tokyo'),
    },
    {
      year: tr('Apr 2019'),
      role: tr('R&D Researcher'),
      experience: tr('Development of Electron Probe Micro Analyzer', 'About Me'),
      edin: <TextLink href="https://www.jeol.co.jp">{tr('JEOL')}</TextLink>,
    },
    {
      year: tr('May 2020'),
      role: tr('Software Engineer/Team Lead'),
      experience: (
        <ul>
          <li>
            {tr('Development of New Stock Management System from scratch', 'About Me')}
            <br /> {tr('that manages ~100,000 items per store', 'About Me')}
          </li>
          <li>{tr('Backend Services, Cloud Infrastructure, and Frontend Pages', 'About Me')}</li>
          <li>{tr('Kotlin, SpringBoot, SQL, AWS CDK, Pug (HTML)', 'About Me')}</li>
          <li>{tr('Software Design of New Features', 'About Me')}</li>
          <li>{tr('Experiences Several Team Lead Roles', 'About Me')}</li>
          <ul>
            <li>・ {tr('Tech Lead of a Small Team (3-5 SWEs)', 'About Me')}</li>
            <li>・ {tr('Lead of Whole Project (2-3 teams and ~20 SWEs in total)', 'About Me')}</li>
            <li>・ {tr('People Manager (4-5 direct reports)', 'About Me')}</li>
          </ul>
        </ul>
      ),
      edin: <TextLink href="https://www.team-lab.com/">{tr('TeamLab')}</TextLink>,
    },
    {
      year: tr('May 2022'),
      role: tr('Software Engineer'),
      // role: 'Senior Software Engineer', TBD
      experience: (
        <ul>
          <li>{tr('Development of Employer Features', 'About Me')}</li>
          <li>{tr('Backend Services, Frontend Pages, Cloud Infrastructure, and Data Analysis', 'About Me')}</li>
          <li>{tr('Java, SpringBoot, Terraform, React, AWS SQS, DynamoDB', 'About Me')}</li>
          <li>{tr('Experiences:', 'About Me')}</li>
          <li>
            {tr('Automated Messaging System', 'About Me')}
            <br />
            &nbsp;{' '}
            {tr(
              'Implemented an automated messaging system spanning frontend, backend, and a scheduling platform (Temporal)',
              'About Me'
            )}
            <br />・ {tr('Led 1 SWE while mentoring him', 'About Me')}
          </li>
          <li>
            {tr('Codebase Migration of High-volume Email Sending System', 'About Me')}
            <br />
            &nbsp; {tr('Migrated 10+ years old codebase to a new system which sends 1M+ emails per day', 'About Me')}
            <br />・ {tr('Worked with another SWE together', 'About Me')}
          </li>
          <li>
            {tr('Email Suppressing Feature', 'About Me')}
            <br />
            &nbsp;
            {tr(
              "Implemented a feature to reduce the employer's notifications to a reasonable amount in the above system",
              'About Me'
            )}
            <br />・ {tr('Spans frontend, backend, and 2 new DynamoDB tables', 'About Me')}
            <br />・ {tr('Led 2 SWEs', 'About Me')}
          </li>
        </ul>
      ),
      edin: <TextLink href="https://www.indeed.com/">{tr('Indeed')}</TextLink>,
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-4xl font-bold mb-4">{tr('About Me')}</h2>
      <p className="text-center">{tr("Let me introduce myself in an inorganic way as I'm a software engineer :)")}</p>

      <Table className="mt-6">
        <TableCaption>{tr('Thank you for reading my history.')}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">{tr('Year/Month')}</TableHead>
            <TableHead>{tr('Role')}</TableHead>
            <TableHead>{tr('Experience')}</TableHead>
            <TableHead className="text-right">{tr('Education/Industry')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {experiences.map(item => (
            <TableRow key={item.year}>
              <TableCell className="font-medium">{item.year}</TableCell>
              <TableCell>{item.role}</TableCell>
              <TableCell className="wrap-break-word">{item.experience}</TableCell>
              <TableCell className="text-right">{item.edin}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default About;
