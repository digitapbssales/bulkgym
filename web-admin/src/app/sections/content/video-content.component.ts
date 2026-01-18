import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';

type VideoContentRow = {
  id: string;
  title: string;
  tags: string[];
  difficulty: string;
  durationMinutes: number;
  status: 'draft' | 'published';
};

@Component({
  selector: 'app-video-content',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section>
      <h2>Video content</h2>
      <p>On-demand video library entries stored in Supabase Storage.</p>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Tags</th>
            <th>Difficulty</th>
            <th>Duration</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let row of rows">
            <td>{{ row.title }}</td>
            <td>{{ row.tags.join(', ') }}</td>
            <td>{{ row.difficulty }}</td>
            <td>{{ row.durationMinutes }} min</td>
            <td>
              <span
                [class.chip-published]="row.status === 'published'"
                [class.chip-draft]="row.status === 'draft'"
              >
                {{ row.status === 'published' ? 'Published' : 'Draft' }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  `,
  styles: [
    `
      section {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }

      table {
        width: 100%;
        border-collapse: collapse;
      }

      th,
      td {
        padding: 0.5rem 0.75rem;
        border-bottom: 1px solid #e5e7eb;
        text-align: left;
      }

      th {
        font-weight: 600;
      }

      .chip-published,
      .chip-draft {
        display: inline-flex;
        align-items: center;
        padding: 0.125rem 0.5rem;
        border-radius: 999px;
        font-size: 0.75rem;
      }

      .chip-published {
        background-color: #dcfce7;
        color: #166534;
      }

      .chip-draft {
        background-color: #e5e7eb;
        color: #374151;
      }
    `,
  ],
})
export class VideoContentComponent {
  protected rows: VideoContentRow[] = [
    {
      id: 'vc1',
      title: 'Full body strength 30',
      tags: ['strength', 'full body'],
      difficulty: 'Intermediate',
      durationMinutes: 30,
      status: 'published',
    },
    {
      id: 'vc2',
      title: 'Conditioning finisher',
      tags: ['conditioning'],
      difficulty: 'Advanced',
      durationMinutes: 15,
      status: 'published',
    },
    {
      id: 'vc3',
      title: 'Mobility reset',
      tags: ['mobility', 'recovery'],
      difficulty: 'All levels',
      durationMinutes: 20,
      status: 'draft',
    },
  ];
}

