import React from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import { Mail, Building2, Globe, FileText, ExternalLink } from 'lucide-react';

export default function TeamCard({ user, onViewPosts, isLoadingPosts }) {
  // Extract initials
  const initials = (user.name || 'LF')
    .split(' ')
    .map((word) => word[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  // Clean external website URL
  const websiteUrl = user.website.startsWith('http://') || user.website.startsWith('https://')
    ? user.website
    : `https://${user.website}`;

  return (
    <Card glow className="p-6 flex flex-col justify-between group h-full">
      <div>
        {/* Card Header: Avatar & Names */}
        <div className="flex items-center gap-3.5 mb-5">
          <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-accent-cyan via-teal-400 to-accent-emerald text-dark-900 font-extrabold text-base flex items-center justify-center shadow-lg shadow-accent-cyan/20 flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
            {initials}
          </div>

          <div className="min-w-0">
            <h3 className="text-lg font-bold text-white group-hover:text-accent-cyan transition-colors truncate">
              {user.name}
            </h3>
            <span className="font-mono text-xs font-semibold text-accent-cyan">
              @{user.username}
            </span>
          </div>
        </div>

        {/* User Info Details */}
        <div className="space-y-3 py-4 border-y border-white/5 mb-5 text-sm text-gray-300">
          {/* Email link */}
          <div className="flex items-center gap-2.5">
            <Mail className="w-4 h-4 text-accent-cyan flex-shrink-0" />
            <a
              href={`mailto:${user.email}`}
              className="text-xs sm:text-sm text-gray-300 hover:text-accent-cyan transition-colors truncate hover:underline"
              title={`Send email to ${user.name}`}
            >
              {user.email}
            </a>
          </div>

          {/* Company Name */}
          <div className="flex items-center gap-2.5">
            <Building2 className="w-4 h-4 text-accent-emerald flex-shrink-0" />
            <span className="text-xs sm:text-sm text-gray-300 font-medium truncate">
              {user.company?.name || 'Independent Specialist'}
            </span>
          </div>

          {/* Website Link */}
          <div className="flex items-center gap-2.5">
            <Globe className="w-4 h-4 text-purple-400 flex-shrink-0" />
            <a
              href={websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs sm:text-sm text-gray-300 hover:text-accent-cyan transition-colors flex items-center gap-1 truncate hover:underline"
              title={`Visit website of ${user.name}`}
            >
              <span className="truncate">{user.website}</span>
              <ExternalLink className="w-3 h-3 flex-shrink-0 opacity-70" />
            </a>
          </div>
        </div>
      </div>

      {/* Card Footer: View Posts Action Button */}
      <div className="pt-2">
        <Button
          variant="outline"
          size="sm"
          className="w-full text-xs font-semibold"
          onClick={() => onViewPosts(user)}
          disabled={isLoadingPosts}
          icon={<FileText className="w-3.5 h-3.5" />}
        >
          {isLoadingPosts ? 'Loading Publications...' : 'View Posts'}
        </Button>
      </div>
    </Card>
  );
}

